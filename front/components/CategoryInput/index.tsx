import React from 'react';
import styled from 'styled-components';

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

const CategoryInput = () => {
	return (
		<CategoryInputBox>
			<div>카테고리1</div>
			<div>카테고리2</div>
			<input type="text" placeholder="카테고리를 입력해주세요" />
		</CategoryInputBox>
	);
};

export default CategoryInput;
