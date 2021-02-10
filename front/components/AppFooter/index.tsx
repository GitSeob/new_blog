import React from 'react';
import styled from 'styled-components';

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

const AppFooter = () => {
	return (
		<AppFooterBox>
			<div>
				<div>
					<img src="/github.svg" alt="" />
					<a href="https://github.com/gitseob" target="_blank">
						gitseob
					</a>
				</div>
				<div>
					<div>
						<img src="/about_white.svg" alt="" />
					</div>
					about
				</div>
				<div>
					<div>
						<img src="/email.svg" alt="" />
					</div>
					anhs0220@gmail.com
				</div>
			</div>
		</AppFooterBox>
	);
};

export default AppFooter;
