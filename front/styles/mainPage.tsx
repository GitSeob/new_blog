import styled from 'styled-components';
import { DefaultBox } from './default';

export const MainContainer = styled(DefaultBox)`
	padding: 40px 0;

	& > p {
		font-size: 1rem;
		margin: 2rem 20px;
	}
`;

export const SearchInput = styled.div`
	margin: 0 20px 1rem 20px;
	position: relative;
	height: 60px;
	border-radius: 30px;
	box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.16);
	overflow: hidden;

	img {
		position: absolute;
		left: 1rem;
		height: 60px;
		padding: 1rem 0;
	}

	input {
		font-size: 18px;
		color: #707070;
		height: 100%;
		width: 100%;
		padding: 20px 0 20px 4rem;

		&:focus {
			color: #212529;
		}
	}
`;

export const ErrorContainer = styled.div`
	width: 100%;
	min-height: inherit;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	p {
		margin-top: 2rem;
	}
`;
