import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface BlockProps {
	current: boolean;
}

const Block = styled.a<BlockProps>`
	border-radius: 0.5rem;
	box-shadow: 0 0.06875rem 0.1875rem rgba(90, 97, 105, 0.1), 0 0.0375rem 0.40625rem rgba(90, 97, 105, 0.1);
	padding: 0.5rem 1rem;
	margin: 0 10px 10px 0;
	font-size: 12px;
	font-weight: ${(props) => (props.current ? '600' : 'inherit')};
	color: ${(props) => (props.current ? '#fff' : 'inherit')};
	background: ${(props) => (props.current ? 'linear-gradient(135deg, #3B87CA, #633094);' : '#fff')};
`;

interface CBProps {
	pageRoot: string;
	name: string;
	num?: number;
	current: boolean;
}

const CategoryBlock = ({ pageRoot = '', name, num = 0, current }: CBProps) => {
	return (
		<Link href={`/${pageRoot}${name === '전체글' ? '' : `?category=${name}`}`}>
			<Block current={current}>
				{name} ({num})
			</Block>
		</Link>
	);
};

export default CategoryBlock;
