// pages/index.tsx

import React, { useEffect } from 'react';
import { MainContainer } from '@styles/mainPage';
import HeadCategories from '@containers/HeadCategories';
import PostCards from '@containers/PostCards';
import wrapper from '@store/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerProps } from '@typings/datas';
import { LOAD_CATEGORIES_REQUEST, LOAD_POSTS_REQUEST } from '@reducers/posts';
import { LOAD_USER_REQUSET } from '@reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';

interface IndexProps {
	category: string;
}

const Index = ({ category }: IndexProps) => {
	const { posts, Category, isLoaddingPosts, EndOfPosts, numberOfPosts } = useSelector(
		(state: RootReducerProps) => state.posts,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 180) {
				if (!(isLoaddingPosts || EndOfPosts)) {
					const lastId = posts[posts.length - 1]?.id;
					dispatch({
						type: LOAD_POSTS_REQUEST,
						payload: {
							category: category,
							lastId: lastId,
						},
					});
				}
			}
		};

		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	return (
		<MainContainer>
			<HeadCategories category={category} Category={Category} pageRoot="" postNum={numberOfPosts} />
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
		payload: {
			category: context.query.category,
		},
	});
	context.store.dispatch({
		type: LOAD_USER_REQUSET,
	});
	context.store.dispatch({
		type: LOAD_CATEGORIES_REQUEST,
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
	return { props: { category: context.query.category ? context.query.category : '' } };
});

export default Index;
