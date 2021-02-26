import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
	0% {
		transform: translateY(0);
	}
	40% {
		transform: translateY(23px);
	}
	60% {
		transform: translateY(-25px);
	}
	80%{
		transform: translateY(0);
	}
`;

export const LoadingBalls = styled.div`
	position: relative;
	width: 80px;
	height: 200px;
	margin-top: 50px;

	& > div {
		height: 200px;
		margin-top: 50px;

		.circle {
			display: inline-block;
			background: rgb(95, 58, 154);
			height: 15px;
			width: 15px;
			border-radius: 25px;
			margin: 0 2px;
		}

		.ball-1 {
			animation: ${bounce} 1s ease-in-out infinite;
		}
		.ball-2 {
			animation: ${bounce} 1s ease-in-out 0.1s infinite;
		}
		.ball-3 {
			animation: ${bounce} 1s ease-in-out 0.2s infinite;
		}
	}
`;

export const Background = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.35);
	z-index: 999;
`;
