import Link from 'next/link';
import dayjs from 'dayjs';

interface PostBarProps {
	post: {
		id: number;
		title: string;
		createdAt: string;
	};
}

const PostBar = ({ post }: PostBarProps) => {
	return (
		<Link href={`/post/${post.id}`}>
			<a>
				<div>
					{post.title}
					<p className="date">{dayjs(post.createdAt).format('YYYY년 MM월 DD일')}</p>
				</div>
			</a>
		</Link>
	);
};

export default PostBar;
