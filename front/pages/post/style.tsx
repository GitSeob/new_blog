import styled from 'styled-components';
import { DefaultBox } from '@styles/default';

export const Container = styled(DefaultBox)`
	padding: 40px 20px;

	& > p {
		margin: 1rem 0 1rem 0;
	}
	& > img {
		margin-top: 2rem;
		width: 100%;
	}

	& > div.bodyContainer {
		background: #fff;
		box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.16);
	}
`;
