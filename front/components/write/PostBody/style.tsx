import styled from 'styled-components';

export const BodyDiv = styled.div`
	padding: 2rem;
	white-space: pre-wrap;
	overflow: auto;
	width: 100%;

	* {
		max-width: 100%;
	}

	& > h1 {
		margin-bottom: 1rem;
		font-size: 2.5rem;
		font-weight: 700;
	}

	& > div {
		& > * {
			width: 100%;
		}

		p,
		table {
			line-height: 1.8;
		}

		ol,
		ul {
			line-height: 1.8;
			white-space: normal;
		}

		h1 {
			font-size: 2.5rem;
			font-weight: 700;
		}

		blockquote {
			background: #f6f6f6;
			line-height: 1;
			padding: 0 2rem;
			border-left: 4px solid #662d91;
		}

		hr {
			height: 2px;
			background: #ededed;
		}

		a {
			font-weight: 500;
			color: #222d91;
		}

		table {
			width: 100%;
			background: #f3f3f3;

			th,
			tr,
			td {
				text-align: center;
			}

			th,
			td {
				border-right: 1px solid #efefef;

				&:nth-child(1) {
					border-left: 1px solid #efefef;
				}
			}

			tbody > tr:nth-child(odd) {
				background: #fafafa;
			}
		}
		img {
			width: 100%;
		}

		& > pre {
			line-height: 1.5;
			background: #f3f3f3;
			padding: 1rem;
			border-radius: 0.3rem;
		}

		& > p > code {
			background: #f3f3f3;
			padding: 0.3rem 0.6rem;
			font-size: 12px;
			border-radius: 0.3rem;
		}
	}

	&.preview {
		@media screen and (max-width: 700px) {
			display: none;
		}
	}
`;