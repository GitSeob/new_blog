import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { Container } from './style';
import { DateP } from '@styles/default';
import Categories from '@containers/Categories';
import PostBody from '@components/PostBody';
import wrapper from '@store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_USER_REQUSET } from '@reducers/user';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { RootState } from '@reducers/index';
import { LOAD_POST_REQUEST } from '@reducers/post';
import Head from 'next/head';
import DefaultErrorPage from 'next/error';
import PostTitle from '@components/PostTitle';

const PostPage = () => {
	const { post, loadErrorReason, isRemovedPost } = useSelector((state: RootState) => state.post);
	const { user } = useSelector((state: RootState) => state.user);
	const router = useRouter();

	useEffect(() => {
		if (isRemovedPost) {
			alert('포스트가 삭제되었습니다.');
			router.push('/');
		}
	}, [isRemovedPost]);

	return (
		<Container>
			{post ? (
				<>
					<Head>
						<title>{post.title}</title>
						<meta name="description" content={post.description} />
					</Head>
					<PostTitle title={post.title} id={post.id} isUser={user && true} />
					<DateP>{dayjs(post.createdAt).format('YYYY년 MM월 DD일')}</DateP>
					<Categories categories={post.categoryPosts} aflg={false} />
					{post.thumbnail && <img src={post.thumbnail} />}
					<div className="bodyContainer">
						<PostBody setTitle={false} body={post.body} />
					</div>
				</>
			) : (
				<DefaultErrorPage statusCode={404} />
			)}
		</Container>
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
	if (context.params) {
		context.store.dispatch({
			type: LOAD_POST_REQUEST,
			payload: context.params.id,
		});
	}
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
	return { props: { category: context.query.category ? context.query.category : '' } };
});

export default PostPage;
