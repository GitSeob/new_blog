import React from 'react';
import styled from 'styled-components';
import useInput from '@hooks/useInput';
import { ICategory } from '@typings/datas';

const CategoryInputBox = styled.form`
	width: 100%;
	display: flex;
	flex-flow: row wrap;

	& > input,
	& > div {
		margin: 0 10px 10px 0;
		padding: 0.5rem 1rem;
		background: #ededed;
		color: #707070;
		border-radius: 5px;
		font-size: 12px;
		line-height: 1.2;
	}

	& > input:focus {
		color: #212529;
	}
`;

interface CategoryInputProps {
	categories: ICategory[];
	setCategories(category: any): void;
}

const CategoryInput = ({ categories, setCategories }: CategoryInputProps) => {
	const [newCategory, onChangeNC, setNC] = useInput('');

	const addNewCategory = (name: string) => {
		if (name.length < 2 || name === 'undefined' || categories.find((category) => category.name === newCategory))
			return;
		setCategories([...categories, { name: newCategory }]);
		setNC('');
	};

	return (
		<CategoryInputBox>
			{categories.map((c, i) => (
				<div key={i}>{c.name}</div>
			))}
			<input
				value={newCategory}
				onChange={onChangeNC}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						addNewCategory(newCategory);
					}
				}}
				onKeyDown={(e) => {
					if (e.key == 'Backspace' && newCategory.length === 0) {
						e.preventDefault();
						setNC(categories[categories.length - 1].name);
						setCategories(categories.slice(0, categories.length - 1));
					}
				}}
				type="text"
				placeholder="카테고리를 입력해주세요"
			/>
		</CategoryInputBox>
	);
};

export default CategoryInput;
