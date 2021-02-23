import PostingForm from '@components/PostingForm';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ConfirmPost from '@containers/ConfirmPost';
import useInput from '@hooks/useInput';
import PostBody from '@components/PostBody';
import wrapper from '@store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_USER_REQUSET } from '@reducers/user';
import { useSelector } from 'react-redux';
import { IPost } from '@typings/datas';
import { useRouter } from 'next/router';
import { RootState } from '@reducers/index';
import DropImage from '@components/DropImage';
import Head from 'next/head';

export const PostingContainer = styled.div`
	width: 100%;
	max-width: 1320px;
	padding: 40px 20px;
	display: flex;

	& > div {
		width: 50%;
		height: calc(100vh - 120px);
	}

	@media screen and (max-width: 1000px) {
		& > div {
			width: 100%;

			&:nth-child(2) {
				display: none;
			}
		}
	}

	@media screen and (max-width: 700px) {
		padding: 0;
		height: calc(100vh - 40px);

		& > div {
			height: 100%;
			box-shadow: none;
		}
	}
`;

interface PostingPageProps {
	post: IPost | null;
}

const Posting = ({ post = null }: PostingPageProps) => {
	const { user } = useSelector((state: RootState) => state.user);
	const { writeSuccess } = useSelector((state: RootState) => state.post);
	const router = useRouter();
	const [title, onChangeTitle] = useInput(post ? post.title : '');
	const [body, onChangeBody, setBody] = useInput(post ? post.body : '');
	const [newImage, setNewImage] = useState('');

	const uploadImage = async (file: any) => {
		if (!file) return;
		if (file.size > 1024 * 1024 * 10) return;
		const fileTypeRegex = /^image\/(.*?)/;
		if (!fileTypeRegex.test(file.type)) return;

		const formData = new FormData();
		await formData.append('image', file);

		await axios.post(`/post/uploadImage`, formData).then((res) => {
			setNewImage(`![](${res.data})`);
		});
	};
	// 함수 props로 넘겨주는 부분에서 body가 '' 이기때문에
	//uploadImage 함수 내부에서 setBody를 사용하면 작성한 body가 증발함

	const onPasteImage = (file: any) => {
		if (!file) return;
		uploadImage(file);
	};

	useEffect(() => {
		if (!user) {
			router.back();
		}
		if (writeSuccess > -1) {
			router.push(`/post/${writeSuccess}`);
		}
	}, [writeSuccess]);

	useEffect(() => {
		if (newImage && body.indexOf(newImage) === -1) setBody(body + newImage);
		return () => {
			setNewImage('');
		};
	}, [body, newImage]); // 이 부분에서 body에 Image 삽입해줌

	return (
		<>
			<Head>
				<title>{post ? '글 수정' : '새 글'}</title>
			</Head>
			<PostingContainer>
				<React.Fragment>
					<PostingForm
						isEditingId={post ? post.id : 0}
						category={post?.categoryPosts}
						title={title}
						onChangeTitle={onChangeTitle}
						body={body}
						onChangeBody={onChangeBody}
						uploadImage={uploadImage}
					/>
					<DropImage onPasteImage={onPasteImage} />
				</React.Fragment>
				<PostBody className="preview" title={title} body={body} />
			</PostingContainer>
			<ConfirmPost title={title} />
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';
	if (context.req && cookie) {
		axios.defaults.headers.Cookie = cookie;
	}
	context.store.dispatch({
		type: LOAD_USER_REQUSET,
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
	return { props: { category: context.query.category ? context.query.category : '' } };
});

export default Posting;
