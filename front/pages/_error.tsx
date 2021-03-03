import { ErrorContainer } from '@styles/mainPage';

interface ErrorProps {
	statusCode: number;
	message?: string | null;
}

function Error({ statusCode, message = null }: ErrorProps) {
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
}

interface GIPProps {
	res: any;
	err: any;
}

Error.getInitialProps = ({ res, err }: GIPProps) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
