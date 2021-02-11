import React from 'react';
import { FormContainer, ButtonBox } from './style';
import CategoryInput from '@components/CategoryInput';
//import Editor from '@components/Editor';

const PostingForm = () => {
	return (
		<FormContainer>
			<input type="text" placeholder="제목을 입력해주세요." />
			<CategoryInput />
			<textarea name="body" placeholder="이곳에 글을 작성해주세요." />
			{/*<Editor />*/}
			<ButtonBox>
				<div>임시저장</div>
				<div className="submit">제출하기</div>
			</ButtonBox>
		</FormContainer>
	);
};

export default PostingForm;
