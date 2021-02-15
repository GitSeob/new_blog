// pages/search/index.tsx

import React from 'react';
import { DocumentContext } from 'next/document';
import { MainContainer, SearchInput } from '@styles/mainPage';
import HeadCategories from '@containers/HeadCategories';
import PostCards from '@containers/PostCards';

interface IndexProps {
	category: string;
}

const Search = ({ category }: IndexProps) => {
	return (
		<MainContainer>
			<SearchInput>
				<img src="/search.svg" />
				<input type="text" placeholder="검색어를 입력해주세요." />
			</SearchInput>
			<p>
				총 <b>33개</b>의 글을 찾았어요!
			</p>
			<HeadCategories category={category} pageRoot="" />
			<PostCards />
		</MainContainer>
	);
};

Search.getInitialProps = async (props: DocumentContext) => {
	// post 불러오는 action (category, post 개수, maxIndex:인피니트스크롤링을 위해 ? )
	return { category: props.query.category };
};

export default Search;
