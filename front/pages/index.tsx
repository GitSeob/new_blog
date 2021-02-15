// pages/index.tsx

import React from 'react';
import { DocumentContext } from 'next/document';
import { MainContainer } from '@styles/mainPage';
import HeadCategories from '@containers/HeadCategories';
import PostCards from '@containers/PostCards';

interface IndexProps {
	category: string;
}

const Index = ({ category }: IndexProps) => {
	return (
		<MainContainer>
			<HeadCategories category={category} pageRoot="" />
			<PostCards />
		</MainContainer>
	);
};

Index.getInitialProps = async (props: DocumentContext) => {
	// post 불러오는 action (category, post 개수, maxIndex:인피니트스크롤링을 위해 ? )
	return { category: props.query.category };
};

export default Index;
