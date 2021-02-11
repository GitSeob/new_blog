import React from 'react';
import styled from 'styled-components';

import { DefaultBox } from '@styles/default';
import CategoryBlock from '@components/CategoryBlock';

const CategoryContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
	padding: 0 20px;
`;

const dummyCategory = [
	{
		id: 1,
		name: '카테고리1',
		num: 33,
	},
	{
		id: 2,
		name: '카테고리2',
		num: 33,
	},
	{
		id: 3,
		name: '카테고리3',
		num: 33,
	},
];

interface HeadCategoriesProps {
	category: string;
	pageRoot: string;
}

const HeadCategories = ({ category, pageRoot }: HeadCategoriesProps) => {
	return (
		<CategoryContainer>
			<CategoryBlock pageRoot={pageRoot} name="전체글" num={99} current={!category} />
			{dummyCategory.map((c) => (
				<CategoryBlock key={c.id} pageRoot={pageRoot} name={c.name} num={c.num} current={category === c.name} />
			))}
		</CategoryContainer>
	);
};

export default HeadCategories;
