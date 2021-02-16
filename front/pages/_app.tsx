import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { InitStyle } from '@styles/default';
import Layout from '@containers/Layout';
import wrapper from '@store/configureStore';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>new blog</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link
					rel="shortcut icon"
					href="https://gitseob-blog-bucket.s3.ap-northeast-2.amazonaws.com/favicon.ico"
				/>
			</Head>
			<InitStyle />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
};

export default wrapper.withRedux(App);
