import React from 'react';
import styled from 'styled-components';

import CategoryBlock from '@components/main/CategoryBlock';
import { ICategory } from '@typings/datas';

interface HeadCategoriesProps {
	category: string;
	pageRoot: string;
	Category?: ICategory[];
	postNum?: number;
}

const HeadCategories = ({ category, pageRoot, Category = [], postNum = 0 }: HeadCategoriesProps) => {
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

const CategoryContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
	padding: 0 20px;
`;

export default HeadCategories;
