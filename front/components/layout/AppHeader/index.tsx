import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { RootState } from '@reducers/index';
import { useSelector } from 'react-redux';
import { DefaultBox } from '@styles/default';

const AppHeader = () => {
	const { user } = useSelector((state: RootState) => state.user);

	return (
		<HeaderContainer>
			<AppHeaderBox>
				<Link href="/">
					<a>
						<img src="/logo.svg" alt="blog_logo" />
					</a>
				</Link>
				<HeaderButtonBox>
					{user && (
						<Link href="/posting">
							<HeaderButton>
								<img src="/pen.svg" alt="write_button_img" />
							</HeaderButton>
						</Link>
					)}
					<Link href="/search">
						<HeaderButton>
							<img src="/search.svg" />
						</HeaderButton>
					</Link>
					<HeaderButton target="_blank" href="https://github.com/gitseob">
						<img src="/github.svg" alt="github_link_button_img" />
					</HeaderButton>
					<HeaderButton href="https://www.notion.so/1c7a4bc9c4ae4065aaf55524cccbc0cb" target="_blank">
						<img src="/about_icon.svg" alt="fortpolio_link_button" />
					</HeaderButton>
				</HeaderButtonBox>
			</AppHeaderBox>
		</HeaderContainer>
	);
};

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

export default AppHeader;
