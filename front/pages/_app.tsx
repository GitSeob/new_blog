import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyles } from '@styles/default';
import Layout from '@containers/share/Layout';
import wrapper from '@store/configureStore';
import 'prismjs/themes/prism-okaidia.css';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>홍섭씨의 개발 블로그</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link
					rel="shortcut icon"
					href="https://gitseob-blog-bucket.s3.ap-northeast-2.amazonaws.com/images/favicon.ico"
				/>
				<meta name="description" content="좋은 개발자를 꿈꾸는 주니어 개발자 홍섭의 블로그입니다." />
				<meta property="og:title" content="홍섭씨의 개발 블로그" />
				<meta property="og:type" content="blog" />
				<meta property="og:url" content="https://gitseob.github.io" />
				<meta property="og:description" content="좋은 개발자를 꿈꾸는 주니어 개발자 홍섭의 블로그입니다." />
				<meta
					property="og:image"
					content="https://gitseob-blog-bucket.s3.ap-northeast-2.amazonaws.com/images/ogImage.png"
				/>
			</Head>
			<GlobalStyles />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
};

export default wrapper.withRedux(App);
