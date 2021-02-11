import React from 'react';
import { ICategory } from '@typings/datas';
import { PostCard, Thumbnail, Contents } from './style';
import Categories from '@containers/Categories';

interface PostProps {
	post: {
		id: number;
		title: string;
		thumbnail: string;
		description: string;
		createAt: string;
		Category: ICategory[];
	};
}

const Post = ({ post }: PostProps) => {
	return (
		<PostCard>
			<Thumbnail>
				<div>
					<div />
					<img src={post.thumbnail} />
				</div>
			</Thumbnail>
			<Contents>
				<a>
					<h4>{post.title}</h4>
					<p className="date">{post.createAt}</p>
					<p>{post.description}</p>
					<Categories categories={post.Category} style={{ height: '28px' }} aflg={false} />
				</a>
			</Contents>
		</PostCard>
	);
};

export default Post;
