import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { InitStyle } from '@styles/default';
import Layout from '@containers/Layout';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>new blog</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="shortcut icon" href="./favicon.ico" />
			</Head>
			<InitStyle />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
};

export default App;
