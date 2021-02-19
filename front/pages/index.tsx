// pages/index.tsx

import React from 'react';
import { MainContainer } from '@styles/mainPage';
import HeadCategories from '@containers/HeadCategories';
import PostCards from '@containers/PostCards';
import wrapper from '../store/configureStore';
import { useSelector } from 'react-redux';
import { RootReducerProps } from '@typings/datas';
import { LOAD_POSTS_REQUEST } from '@reducers/posts';
import { LOAD_USER_REQUSET } from '@reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';

interface IndexProps {
	category: string;
}

const Index = ({ category }: IndexProps) => {
	const { posts } = useSelector((state: RootReducerProps) => state.posts);
	return (
		<MainContainer>
			<HeadCategories category={category} pageRoot="" />
			<PostCards posts={posts} />
		</MainContainer>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';
	if (context.req && cookie) {
		axios.defaults.headers.Cookie = cookie;
	}
	context.store.dispatch({
		type: LOAD_POSTS_REQUEST,
	});
	context.store.dispatch({
		type: LOAD_USER_REQUSET,
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
	return { props: { category: context.query.category ? context.query.category : '' } };
});

export default Index;
