import React from 'react';
import useInput from '@hooks/useInput';
import Posting from './index';
import wrapper from '@store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_USER_REQUSET } from '@reducers/user';
import { useSelector } from 'react-redux';
import { IPost } from '@typings/datas';
import { RootState } from '@reducers/index';
import { useRouter } from 'next/dist/client/router';
import { LOAD_POST_REQUEST } from '@reducers/post';

const ExistingPost = () => {
	const { post } = useSelector((state: RootState) => state.post);

	return (
		<>
			<Posting post={post} />
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
	context.store.dispatch({
		type: LOAD_POST_REQUEST,
		payload: context.params?.id,
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
	return { props: { category: context.query.category ? context.query.category : '' } };
});

export default ExistingPost;
