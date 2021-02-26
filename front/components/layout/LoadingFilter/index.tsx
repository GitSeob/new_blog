import React from 'react';
import { Background, LoadingBalls } from './style';

const LoadingFilter = () => {
	return (
		<Background>
			<LoadingBalls>
				<div>
					<div className="circle ball-1"></div>
					<div className="circle ball-2"></div>
					<div className="circle ball-3"></div>
				</div>
			</LoadingBalls>
		</Background>
	);
};

export default LoadingFilter;
