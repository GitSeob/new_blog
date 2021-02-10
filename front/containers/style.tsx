import styled from 'styled-components';
import { DefaultBox, W100Div } from '@styles/default';

export const HeaderContainer = styled.div`
	width: 100%;
	height: 40px;
	background: #fff;
`;

export const PageContainer = styled(DefaultBox)`
	min-height: calc(100vh - 40px);
`;

export const AppHeaderBox = styled(DefaultBox)`
	position: relative;

	a {
		img {
			height: 20px;
			margin: 10px 0;
		}
	}
`;

export const HeaderButtonBox = styled.div`
	position: absolute;
	height: 100%;
	top: 0;
	right: 0;
	display: flex;
	align-items: center;
`;

export const HeaderButton = styled.a`
	width: 30px;
	height: 30px;
	border-radius: 15px;
	background: #ededed;
	margin-right: 1rem;

	& > img {
		width: 20px;
		height: 20px;
		color: #495057;
		margin: 5px !important;
	}

	&nth-child(2) {
		margin-right: 0;
	}
`;

export const AppFooterBox = styled.div`
	width: 100%;
	padding: 2rem;
	font-size: 14px;
	line-height: 1.5;
	background: #f2f2f2;

	& > div {
		margin: 0 auto;
		width: fit-content;
		justify-content: flex-start;

		& > div {
			display: flex;
			align-items: center;
			margin-bottom: 10px;

			& > img {
				width: 18px;
				height: 18px;
				color: #fff;
				margin-right: 0.5rem;
			}

			& > div {
				width: 18px;
				height: 18px;
				border-radius: 9px;
				margin-right: 0.5rem;
				background: #212529;
				position: relative;

				img {
					position: absolute;
					top: 2px;
					left: 2px;
					margin: auto;
					width: 14px;
					height: 14px;
					color: #fff;
				}
			}
			&nth-child(2) {
				margin-bottom: 0;
			}
		}
	}
`;
