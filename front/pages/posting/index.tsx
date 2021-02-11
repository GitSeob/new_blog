import PostingForm from '@components/PostingForm';
import React from 'react';
import styled from 'styled-components';

const PostingContainer = styled.div`
	width: 100%;
	height: 100%;
	max-width: 1320px;
	padding: 40px 20px;
	display: flex;

	& > div,
	& > form {
		width: 50%;

		@media screen and (max-width: 1000px) {
			width: 100%;

			&:nth-child(2) {
				display: none;
			}
		}
	}
`;

const Posting = () => {
	return (
		<PostingContainer>
			<PostingForm />
			<div></div>
		</PostingContainer>
	);
};

export default Posting;
