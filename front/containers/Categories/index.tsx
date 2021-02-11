import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { ICategory } from '@typings/datas';

const CategoriesContainer = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row wrap;
	overflow: hidden;

	& > a,
	& > div {
		padding: 0.5rem 1rem;
		border-radius: 5px;
		background: #ededed;
		color: #495057;
		font-size: 12px;
		margin-right: 1rem;
	}
`;

interface CategoriesProps {
	categories: ICategory[];
	style: object | undefined;
	aflg: boolean;
}

const Categories = ({ categories, style, aflg }: CategoriesProps) => {
	return (
		<CategoriesContainer style={style}>
			{categories.map((c) => (
				<Link href="/" key={c.id}>
					{aflg ? <a>{c.name}</a> : <div>{c.name}</div>}
				</Link>
			))}
		</CategoriesContainer>
	);
};

export default Categories;
