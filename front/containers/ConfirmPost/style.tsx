import styled from 'styled-components';

export const ConfirmPage = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	bottom: 0;
	right: 0;
	background: #fafafa;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.5s;
	overflow: hidden;

	& > div {
		width: 400px;
		//background: #fff;
		padding: 1rem;

		h3 {
			margin: 1rem 0 0.5rem 0;

			span {
				font-size: 10px;
				color: #707070;
				font-weight: 400;
			}

			&:nth-child(1) {
				margin-top: 0;
			}
		}
		& > textarea {
			font-size: 12px;
			color: #495057;
			width: 100%;
			background: #fff;
			padding: 1rem;
			line-height: 1.6;
			word-break: break-all;
		}
	}
`;

export const ThumbnailBox = styled.div`
	width: 100%;
	background: #ededed;
	position: relative;
	overflow: hidden;

	& > div.imageBox {
		display: flex;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transition: 0.3s;

		img {
			width: 100%;
			height: 100%;
			display: block;
			object-fit: cover;
			margin: 0 auto;
		}
	}

	& > div.paddingBox {
		height: 0;
		width: 100%;
		padding-top: 70%;
	}

	& > div.buttonBox {
		z-index: 2;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;

		& > div {
			padding: 0.7rem 1rem;
			background: #fff;
			border-radius: 5px;
			text-align: center;
			cursor: pointer;
			font-weight: 600;
			color: #707070;

			&:nth-child(1) {
				color: rgba(95, 58, 154, 0.8);
				margin-right: 10px;
			}
		}
	}

	button {
		cursor: pointer;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		background: none;

		&.left {
			left: 0;
			transform: translateY(-50%) rotate(180deg);
		}
		&.right {
			right: 0;
		}
	}
`;

export const SubmitButtonBox = styled.div`
	width: 100%;
	display: flex;
	margin-top: 1.5rem;

	& > div {
		width: 100%;
		padding: 0.7rem 1rem;
		background: #fff;
		border-radius: 5px;
		text-align: center;
		cursor: pointer;
		font-size: 1.125rem;
		font-weight: 600;
		color: #707070;
		border: 2px solid #ededed;
		margin-left: 10px;

		&.selected {
			border: 2px solid rgba(95, 58, 154, 0.63);
			color: rgba(95, 58, 154, 0.8);
		}

		&.submit {
			color: #fff;
			border: 2px solid rgba(95, 58, 154, 0.63);
			background: rgba(95, 58, 154, 0.8);
		}

		&:nth-child(1) {
			margin-left: 0;
		}
	}
`;
