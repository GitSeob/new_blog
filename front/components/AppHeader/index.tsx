import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { DefaultBox } from '@styles/default';

const HeaderContainer = styled.div`
	width: 100%;
	height: 40px;
	background: #fff;
`;

const PageContainer = styled(DefaultBox)`
	min-height: calc(100vh - 40px);
`;

const AppHeaderBox = styled(DefaultBox)`
	position: relative;

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
	right: 0;
	display: flex;
	align-items: center;
`;

const HeaderButton = styled.a`
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
					<Link href="/">
						<HeaderButton>
							<img src="/search.svg" />
						</HeaderButton>
					</Link>
					<HeaderButton target="_blank" href="https://github.com/gitseob">
						<img src="/github.svg" alt="https://github.com/gitseob" />
					</HeaderButton>
					<Link href="/">
						<HeaderButton>
							<img src="/about.svg" alt="" />
						</HeaderButton>
					</Link>
				</HeaderButtonBox>
			</AppHeaderBox>
		</HeaderContainer>
	);
};

export default AppHeaderBox;
