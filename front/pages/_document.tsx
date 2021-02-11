import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		// renderPage : 이 메서드에 연결하여 초기 페이지 로드 시 서버 측 자식 구성 요소의 스타일을 분석한다.
		// renderPage를 커스텀하는 이유 - 서버 측 렌더링에서 제대로 작동하기 위해 에플리케이션을 래핑해야하는 css-in-js(styled-components...) 라이브러리와 함께 사용하기 위해
		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	} //https://nextjs.org/docs/advanced-features/custom-document

	render() {
		return (
			<Html>
				<Head>
					<meta charSet="utf-8" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
