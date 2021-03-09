import { ErrorContainer } from '@styles/mainPage';

interface ErrorProps {
	statusCode: number;
	message?: string | null;
}

const PleaseRefresh = () => {
	return (
		<ErrorContainer>
			<img src="/refresh.png" />
			<p>반갑습니다! 정말 간만의 방문객이세요!</p>
			<p>그래서 서버가 천천히 켜지고 있습니다</p>
			<p>10초 후에 새로고침해주시면 정상적으로 보일거에요!</p>
		</ErrorContainer>
	);
};

const Error = ({ statusCode, message = null }: ErrorProps) => {
	if (statusCode === 408) return <PleaseRefresh />;

	return (
		<ErrorContainer>
			<img src={statusCode === 404 ? '/404.svg' : '/error.png'} />
			{message ? (
				<p>{message}</p>
			) : (
				<p>{statusCode === 404 ? '페이지를 찾을 수 없어요' : '에러가 발생했어요!'}</p>
			)}
		</ErrorContainer>
	);
};

interface GIPProps {
	res: any;
	err: any;
}

Error.getInitialProps = ({ res, err }: GIPProps) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
