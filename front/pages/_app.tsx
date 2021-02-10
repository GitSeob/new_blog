import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { InitStyle } from '@styles/default';
import Layout from '@containers/Layout';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>new blog</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet" />
			</Head>
			<InitStyle />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
};

export default App;
