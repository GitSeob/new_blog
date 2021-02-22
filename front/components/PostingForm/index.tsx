import React, { ChangeEvent } from 'react';
import { FormContainer, ButtonBox } from './style';
import CategoryInput from '@components/CategoryInput';
import { useDispatch } from 'react-redux';
import { OPEN_CONFIRM_POST } from '@reducers/posting';
import InputImage from '@components/InputImage';

interface PostingFormProps {
	title: string;
	onChangeTitle(e: ChangeEvent<HTMLInputElement>): void;
	body: string;
	onChangeBody(e: ChangeEvent<HTMLTextAreaElement>): void;
	uploadImage(file: any): void;
}

const PostingForm = ({ title, onChangeTitle, body, onChangeBody, uploadImage }: PostingFormProps) => {
	const dispatch = useDispatch();
	const [categories, setCategories] = React.useState([]);

	return (
		<FormContainer>
			<input type="text" value={title} onChange={onChangeTitle} placeholder="제목을 입력해주세요." />
			<CategoryInput categories={categories} setCategories={setCategories} />
			<textarea value={body} onChange={onChangeBody} name="body" placeholder="이곳에 글을 작성해주세요." />
			<ButtonBox>
				<InputImage onUploadImage={uploadImage} />
				<div>임시저장</div>
				<div
					className="submit"
					onClick={() => {
						dispatch({
							type: OPEN_CONFIRM_POST,
							payload: {
								body,
								categories,
							},
						});
					}}
				>
					제출하기
				</div>
			</ButtonBox>
		</FormContainer>
	);
};

export default PostingForm;
