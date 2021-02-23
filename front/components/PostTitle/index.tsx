import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { REMOVE_POST_REQUEST } from '@reducers/post';

interface PostTitleProps {
	id: number;
	title: string;
	isUser: boolean;
}

const PostTitle = ({ id, title, isUser }: PostTitleProps) => {
	const dispatch = useDispatch();

	const onClickDeleteButton = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		if (confirm('정말 게시물을 삭제하시겠습니까?')) {
			dispatch({
				type: REMOVE_POST_REQUEST,
				payload: id,
			});
		}
	};

	return (
		<TitleContainer isUser={isUser}>
			<h1>{title}</h1>
			{isUser && (
				<div>
					<Link href={`/posting/${id}`}>
						<a>
							<img src="/pen.svg" />
						</a>
					</Link>
					<div onClick={onClickDeleteButton}>
						<img src="/trash.svg" alt="" />
					</div>
				</div>
			)}
		</TitleContainer>
	);
};

interface TitleContainerProps {
	isUser?: boolean;
}

const TitleContainer = styled.div<TitleContainerProps>`
	position: relative;
	min-height: 30px;

	${(props) => props.isUser && 'padding-right: 70px'};

	& > div {
		position: absolute;
		display: flex;
		top: 0;
		right: 0;
		width: 70px;
		height: 100%;

		a,
		& > div {
			width: 30px;
			height: 30px;
			border-radius: 15px;
			background: #ededed;
			padding: 8px;
			cursor: pointer;

			img {
				width: 14px;
				height: 14px;
			}

			&:nth-child(1) {
				margin-right: 10px;
			}
		}
	}
`;

export default PostTitle;
