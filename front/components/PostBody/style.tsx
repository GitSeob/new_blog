import styled from 'styled-components';

export const BodyDiv = styled.div`
	padding: 2rem;
	white-space: pre-wrap;
	line-height: 1.8;
	overflow: auto;
	width: 100%;

	* {
		max-width: 100%;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 700;
	}

	img {
		width: 100%;
	}

	blockquote {
		background: #f6f6f6;
		padding: 0 2rem;
		border-left: 4px solid #662d91;
	}
`;
