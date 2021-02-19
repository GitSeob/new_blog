// pages/search/index.tsx

import React from 'react';
import { DocumentContext } from 'next/document';
import { MainContainer, SearchInput } from '@styles/mainPage';
import HeadCategories from '@containers/HeadCategories';
import PostCards from '@containers/PostCards';
import { LOAD_USER_REQUSET } from '@reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '@store/configureStore';

interface IndexProps {
	category: string;
}

const Search = ({ category }: IndexProps) => {
	console.log(category);
	return (
		<MainContainer>
			<SearchInput>
				<img src="/search.svg" />
				<input type="text" placeholder="검색어를 입력해주세요." />
			</SearchInput>
			<p>
				총 <b>33개</b>의 글을 찾았어요!
			</p>
			<HeadCategories category={category} pageRoot="search" />
			{/*<PostCards />*/}
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
		type: LOAD_USER_REQUSET,
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
	return { props: { category: context.query.category ? context.query.category : '' } };
});

export default Search;
