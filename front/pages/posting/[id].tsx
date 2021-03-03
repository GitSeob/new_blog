import React, { useEffect } from 'react';
import Posting from './index';
import wrapper from '@store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_USER_REQUSET } from '@reducers/user';
import { useSelector } from 'react-redux';
import { RootState } from '@reducers/index';
import { LOAD_POST_REQUEST } from '@reducers/post';
import Error from '@pages/_error';
import { useRouter } from 'next/router';

const ExistingPost = () => {
	const { post, isEditedPost } = useSelector((state: RootState) => state.post);
	const router = useRouter();

	useEffect(() => {
		if (isEditedPost) {
			alert('게시물이 수정되었습니다.');
			router.push(`/post/${post.id}`);
		}
	}, [isEditedPost]);

	if (post) return <Posting post={post} />;
	else return <Error statusCode={404} />;
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
	context.store.dispatch({
		type: LOAD_POST_REQUEST,
		payload: context.params?.id,
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
	return { props: { category: context.query.category ? context.query.category : '' } };
});

export default ExistingPost;
