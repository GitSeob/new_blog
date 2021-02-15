import React from 'react';
import { ICategory } from '@typings/datas';
import { PostCard, Thumbnail, Contents } from './style';
import Categories from '@containers/Categories';
import Link from 'next/link';

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

const PostCardComponent = ({ post }: PostProps) => {
	return (
		<PostCard>
			{post.thumbnail && (
				<Link href={`/post/${post.id}`}>
					<Thumbnail>
						<div>
							<div />
							<img src={post.thumbnail} />
						</div>
					</Thumbnail>
				</Link>
			)}
			<Contents thumbnail={post.thumbnail ? true : false}>
				<Link href={`/post/${post.id}`}>
					<a>
						<h4>{post.title}</h4>
						<p className="date">{post.createAt}</p>
						<p>{post.description}</p>
					</a>
				</Link>
				<Categories categories={post.Category} style={{ height: '28px' }} aflg={false} />
			</Contents>
		</PostCard>
	);
};

export default PostCardComponent;
