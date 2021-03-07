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
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
				<meta name="description" content="좋은 개발자를 꿈꾸는 주니어 개발자 홍섭의 블로그입니다." />
				<meta property="og:type" content="blog" />
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-V9KPRJCZ8R"></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-V9KPRJCZ8R');`,
					}}
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
