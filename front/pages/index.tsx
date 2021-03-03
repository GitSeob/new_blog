import React, { useEffect } from 'react';
import { MainContainer } from '@styles/mainPage';
import HeadCategories from '@containers/main/HeadCategories';
import PostCards from '@containers/main/PostCards';
import wrapper from '@store/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_CATEGORIES_REQUEST, LOAD_POSTS_REQUEST } from '@reducers/posts';
import { LOAD_USER_REQUSET } from '@reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';
import Error from './_error';
import { RootState } from '@reducers/index';

interface IndexProps {
	category: string;
}

const Index = ({ category }: IndexProps) => {
	const { posts, Category, isLoaddingPosts, EndOfPosts, numberOfPosts, loadPostsErrorReason } = useSelector(
		(state: RootState) => state.posts,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 10) {
				if (!(loadPostsErrorReason || isLoaddingPosts || EndOfPosts)) {
					dispatch({
						type: LOAD_POSTS_REQUEST,
						payload: {
							category: category,
							lastId: posts[posts.length - 1]?.id,
						},
					});
				}
			}
		};

		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [posts]);

	return (
		<>
			{loadPostsErrorReason ? (
				<Error statusCode={503} message="서버가 응답하지 않아요..." />
			) : (
				<MainContainer>
					<HeadCategories category={category} Category={Category} pageRoot="" postNum={numberOfPosts} />
					<PostCards posts={posts} />
				</MainContainer>
			)}
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
		type: LOAD_CATEGORIES_REQUEST,
	});
	context.store.dispatch({
		type: LOAD_POSTS_REQUEST,
		payload: {
			category: context.query.category,
		},
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
	return { props: { category: context.query.category ? context.query.category : '' } };
});

export default Index;
