import PostCardComponent from '@components/PostCard';
import React from 'react';
import styled from 'styled-components';
import { IPost } from '@typings/datas';

const PostContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
`;

interface PostCardsProps {
	posts: IPost[] | null;
}

const PostCards = ({ posts }: PostCardsProps) => {
	return (
		<PostContainer>
			{posts?.map((c, i) => (
				<PostCardComponent key={i} post={c} />
			))}
		</PostContainer>
	);
};

export default PostCards;
