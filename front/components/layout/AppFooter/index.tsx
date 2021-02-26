import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

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
					<img src="/about_icon.svg" alt="" />
					about
				</div>
				<div>
					<div>
						<img src="/email.svg" alt="" />
					</div>
					anhs0220@gmail.com
				</div>
			</div>
			<Link href="/login">
				<a>
					<div />
				</a>
			</Link>
		</AppFooterBox>
	);
};

const AppFooterBox = styled.div`
	position: relative;
	width: 100%;
	padding: 2rem;
	font-size: 14px;
	line-height: 1.5;
	background: #f2f2f2;

	& > a > div {
		width: 4px;
		height: 4px;
	}

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

export default AppFooter;
