import React, { useEffect, useState } from 'react';
import { ILinkedPosts } from '@typings/datas';
import { Box, HeadBox, LinkedCategoryHead, PostListBox, PostList } from './style';
import PostBar from './PostBar';

interface LinkedPostsProps {
	categories: ILinkedPosts[];
	categoryRef: React.MutableRefObject<HTMLDivElement>;
}

const LinkedPosts = ({ categories, categoryRef }: LinkedPostsProps) => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		setIndex(0);
	}, [categories]);

	return (
		<Box ref={categoryRef}>
			<HeadBox>
				{categories.map((category, i) => (
					<LinkedCategoryHead
						key={i}
						style={{ background: `${index === i ? '#fff' : '#f3f3f3'}` }}
						onClick={() => {
							setIndex(i);
						}}
					>
						{category.name}
					</LinkedCategoryHead>
				))}
			</HeadBox>
			<PostListBox>
				<div style={{ left: `-${index * 100}%` }}>
					{categories.map((c, i) => (
						<PostList key={i}>
							{c.posts.map((post) => {
								return <PostBar key={post.id} post={post} />;
							})}
						</PostList>
					))}
				</div>
			</PostListBox>
		</Box>
	);
};

export default LinkedPosts;
