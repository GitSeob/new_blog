import React, { ChangeEvent } from 'react';
import { FormContainer, ButtonBox } from './style';
import CategoryInput from '@components/CategoryInput';

interface PostingFormProps {
	title: string;
	onChangeTitle(e: ChangeEvent<HTMLInputElement>): void;
	body: string;
	onChangeBody(e: ChangeEvent<HTMLTextAreaElement>): void;
}

const PostingForm = ({ title, onChangeTitle, body, onChangeBody }: PostingFormProps) => {
	return (
		<FormContainer>
			<input type="text" value={title} onChange={onChangeTitle} placeholder="제목을 입력해주세요." />
			<CategoryInput />
			<textarea value={body} onChange={onChangeBody} name="body" placeholder="이곳에 글을 작성해주세요." />
			<ButtonBox>
				<div>임시저장</div>
				<div className="submit">제출하기</div>
			</ButtonBox>
		</FormContainer>
	);
};

export default PostingForm;
