import React, { useEffect, useCallback } from 'react';
import { MainContainer, SearchInput } from '@styles/mainPage';
import PostCards from '@containers/main/PostCards';
import { LOAD_USER_REQUSET } from '@reducers/user';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '@store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reducers/index';
import useInput from '@hooks/useInput';
import { useRouter } from 'next/router';
import { LOAD_POSTS_REQUEST } from '@reducers/posts';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';

interface SearchProps {
	search: string;
}

const Search = ({ search }: SearchProps) => {
	const { posts, isLoaddingPosts, EndOfPosts, loadPostsErrorReason } = useSelector((state: RootState) => state.posts);
	const [keyword, onChangeKeyword] = useInput('');
	const dispatch = useDispatch();
	const router = useRouter();

	const onLoadSearchPosts = useCallback((keyword) => {
		router.push(`/search?search=${keyword}`);
	}, []);

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 10) {
				if (!(loadPostsErrorReason || isLoaddingPosts || EndOfPosts)) {
					const lastId = posts[posts.length - 1]?.id;
					dispatch({
						type: LOAD_POSTS_REQUEST,
						payload: {
							search: search,
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
		<>
			<Head>
				<title>검색</title>
				<meta property="og:title" content="홍섭씨의 개발 블로그" />
				<meta property="og:url" content="https://blog.hsan.kr/search" />
				<meta property="og:description" content="검색 페이지 - 홍섭씨의 개발 블로그" />
				<meta
					property="og:image"
					content="https://gitseob-blog-bucket.s3.ap-northeast-2.amazonaws.com/images/ogImage.png"
				/>
			</Head>
			<MainContainer>
				<SearchInput>
					<img src="/search.svg" />
					<input
						type="text"
						placeholder="검색어를 입력해주세요."
						value={keyword}
						onChange={onChangeKeyword}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								onLoadSearchPosts(keyword);
							}
						}}
					/>
				</SearchInput>
				{loadPostsErrorReason ? (
					<DefaultErrorPage statusCode={503} title="서버가 응답하지 않습니다." />
				) : (
					<>
						{search && (
							<p>
								총 <b>{posts.findPostCount}</b>개의 글을 찾았어요!
							</p>
						)}

						<PostCards posts={posts} />
					</>
				)}
			</MainContainer>
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
	if (context.query.search)
		context.store.dispatch({
			type: LOAD_POSTS_REQUEST,
			payload: {
				search: context.query.search,
			},
		});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
	return { props: { search: context.query.search ? context.query.search : '' } };
});

export default Search;
