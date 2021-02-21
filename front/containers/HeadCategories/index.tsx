import React from 'react';
import styled from 'styled-components';

import { DefaultBox } from '@styles/default';
import CategoryBlock from '@components/CategoryBlock';
import { ICategoryHead } from '@typings/datas';

const CategoryContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
	padding: 0 20px;
`;

interface HeadCategoriesProps {
	category: string;
	pageRoot: string;
	Category: ICategoryHead[];
	postNum?: number;
}

const HeadCategories = ({ category, pageRoot, Category, postNum = 0 }: HeadCategoriesProps) => {
	return (
		<CategoryContainer>
			<CategoryBlock pageRoot={pageRoot} name="전체글" num={postNum} current={!category} />
			{Category &&
				Category.map((c) => (
					<CategoryBlock
						key={c.id}
						pageRoot={pageRoot}
						name={c.name}
						num={c.postCount ? c.postCount : 0}
						current={category === c.name}
					/>
				))}
		</CategoryContainer>
	);
};

export default HeadCategories;
