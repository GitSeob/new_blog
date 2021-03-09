import PostingForm from '@components/write/PostingForm';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ConfirmPost from '@containers/write/ConfirmPost';
import useInput from '@hooks/useInput';
import PostBody from '@components/write/PostBody';
import wrapper from '@store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_USER_REQUSET } from '@reducers/user';
import { useSelector } from 'react-redux';
import { IPost } from '@typings/datas';
import { useRouter } from 'next/router';
import { RootState } from '@reducers/index';
import DropImage from '@components/write/DropImage';
import Head from 'next/head';
import LoadingFilter from '@components/layout/LoadingFilter';

interface PostingPageProps {
	post: IPost | null;
}

const Posting = ({ post = null }: PostingPageProps) => {
	const { user } = useSelector((state: RootState) => state.user);
	const { writeSuccess } = useSelector((state: RootState) => state.post);
	const loading = useSelector((state: RootState) => state.loading);
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
		await axios.post(`/post/uploadImage`, formData, { timeout: 10000 }).then((res) => {
			setNewImage(`![](${res.data})`);
		});
	};

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
	}, [body, newImage]);

	return (
		<>
			<Head>
				<title>{post ? '글 수정' : '새 글'}</title>
			</Head>
			{loading['post/WRITE_POST_REQUEST'] && <LoadingFilter />}
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
			<ConfirmPost title={title} post={post} />
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
