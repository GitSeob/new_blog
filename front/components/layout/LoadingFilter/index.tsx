import React from 'react';
import { Background, LoadingBalls } from './style';

export const LoadingBallBox = () => {
	return (
		<LoadingBalls>
			<div>
				<div className="circle ball-1"></div>
				<div className="circle ball-2"></div>
				<div className="circle ball-3"></div>
			</div>
		</LoadingBalls>
	);
};

const LoadingFilter = () => {
	return (
		<Background>
			<LoadingBallBox />
		</Background>
	);
};

export default LoadingFilter;
