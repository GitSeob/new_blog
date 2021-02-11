import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { DefaultBox } from '@styles/default';

const HeaderContainer = styled.div`
	width: 100%;
	height: 40px;
	background: #fff;
`;

const AppHeaderBox = styled(DefaultBox)`
	position: relative;
	padding: 0 20px;

	a {
		img {
			height: 20px;
			margin: 10px 0;
		}
	}
`;

const HeaderButtonBox = styled.div`
	position: absolute;
	height: 100%;
	top: 0;
	right: 20px;
	display: flex;
	align-items: center;
`;

const HeaderButton = styled.a`
	width: 30px;
	height: 30px;
	border-radius: 15px;
	background: #ededed;
	margin-left: 10px;

	& > img {
		width: 14px;
		height: 14px !important;
		color: #495057;
		margin: 8px !important;
	}
`;

const AppHeader = () => {
	return (
		<HeaderContainer>
			<AppHeaderBox>
				<Link href="/">
					<a>
						<img src="/logo.svg" />
					</a>
				</Link>
				<HeaderButtonBox>
					<Link href="/search">
						<HeaderButton>
							<img src="/search.svg" />
						</HeaderButton>
					</Link>
					<HeaderButton target="_blank" href="https://github.com/gitseob">
						<img src="/github.svg" alt="https://github.com/gitseob" />
					</HeaderButton>
					<HeaderButton href="/">
						<img src="/about_icon.svg" alt="" />
					</HeaderButton>
				</HeaderButtonBox>
			</AppHeaderBox>
		</HeaderContainer>
	);
};

export default AppHeader;