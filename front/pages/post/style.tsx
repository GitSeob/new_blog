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
		0 0.06875rem 0.1875rem rgba(90, 97, 105, 0.1), 0 0.0375rem 0.40625rem rgba(90, 97, 105, 0.1),
		0 0.05rem 0.03125rem rgba(90, 97, 105, 0.12), 0 0.125rem 0.1875rem rgba(90, 97, 105, 0.1);
	}
`;
