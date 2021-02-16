// pages/index.tsx

import React from 'react';
import { MainContainer } from '@styles/mainPage';
import HeadCategories from '@containers/HeadCategories';
import PostCards from '@containers/PostCards';
import wrapper from '../store/configureStore';
import { useSelector } from 'react-redux';
import { RootReducerProps } from '@typings/datas';
import { LOAD_POSTS_SUCCESS } from '@reducers/posts';

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
	context.store.dispatch({
		type: LOAD_POSTS_SUCCESS,
	});
	return { props: { category: context.query.category ? context.query.category : '' } };
});

export default Index;
