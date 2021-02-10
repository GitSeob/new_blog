import React from 'react';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { PageContainer, HeaderContainer, AppHeaderBox, HeaderButton, HeaderButtonBox, AppFooterBox } from './style';
import { DefaultBox } from '@styles/default';

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

interface LayoutProps {
	children: NextPageContext | any | {};
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<AppHeader />
			<PageContainer>{children}</PageContainer>
			<AppFooter />
		</>
	);
};

export default Layout;
