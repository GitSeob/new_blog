import PostingForm from '@components/PostingForm';
import React from 'react';
import styled from 'styled-components';
import ConfirmPost from '@containers/ConfirmPost';
import useInput from '@hooks/useInput';
import PostBody from '@components/PostBody';

export const PostingContainer = styled.div`
	width: 100%;
	max-width: 1320px;
	padding: 40px 20px;
	display: flex;

	& > div {
		width: 50%;
		height: calc(100vh - 120px);
	}

	@media screen and (max-width: 1000px) {
		& > div {
			width: 100%;

			&:nth-child(2) {
				display: none;
			}
		}
	}

	@media screen and (max-width: 700px) {
		padding: 0;
		height: calc(100vh - 40px);

		& > div {
			height: 100%;
			box-shadow: none;
		}
	}
`;

const Posting = () => {
	const [title, onChangeTitle] = useInput('');
	const [body, onChangeBody] = useInput('');
	const [tog, setTog] = React.useState(false);

	return (
		<>
			<div
				onClick={() => {
					setTog(!tog);
				}}
			>
				button
			</div>
			<PostingContainer>
				<PostingForm title={title} onChangeTitle={onChangeTitle} body={body} onChangeBody={onChangeBody} />
				<PostBody title={title} body={body} />
			</PostingContainer>
			<ConfirmPost body={body} flg={tog} setFlg={setTog} />
		</>
	);
};

export default Posting;
