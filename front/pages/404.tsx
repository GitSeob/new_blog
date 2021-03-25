import { ErrorContainer } from '@styles/mainPage';

const NotFound = () => {
	return (
		<ErrorContainer>
			<img src="/404.svg" alt="404_image" />
			<p>페이지를 찾을 수 없어요</p>
		</ErrorContainer>
	);
};

export default NotFound;
