import PostCardComponent from '@components/PostCard';
import React from 'react';
import styled from 'styled-components';

const dummyPost = [
	{
		id: 1,
		thumbnail: '',
		title: '포스트 제목',
		description:
			'못하다 밝은 웅대한 현저하게 든 아름 원하고, 목숨을 약동하다. 것은 예가 같은 길지 힘차게 그것은 투명하되 이것이다. 길지 전인 곧 내는 거친 그들은 사랑의 얼음과 위하여서 잠을 자못하다 밝은 웅대한 현저하게 든 아름 원하고, 목숨을 약동하다. 것은 예가 같은 길지 힘차게 그것은 투명하되 이것이다. 길지 전인 곧 내는 거친 그들은 사랑의 얼음과 위하여서 잠을 자못하다 밝은 웅대한 현저하게 든 아름 원하고, 목숨을 약동하다. 것은 예가 같은 길지 힘차게 그것은 투명하되 이것이다. 길지 전인 곧 내는 거친 그들은 사랑의 얼음과 위하여서 잠을 자못하다 밝은 웅대한 현저하게 든 아름 원하고, 목숨을 약동하다. 것은 예가 같은 길지 힘차게 그것은 투명하되 이것이다. 길지 전인 곧 내는 거친 그들은 사랑의 얼음과 위하여서 잠을 자못하다 밝은 웅대한 현저하게 든 아름 원하고, 목숨을 약동하다. 것은 예가 같은 길지 힘차게 그것은 투명하되 이것이다. 길지 전인 곧 내는 거친 그들은 사랑의 얼음과 위하여서 잠을 자못하다 밝은 웅대한 현저하게 든 아름 원하고, 목숨을 약동하다. 것은 예가 같은 길지 힘차게 그것은 투명하되 이것이다. 길지 전인 곧 내는 거친 그들은 사랑의 얼음과 위하여서 잠을 자',
		createAt: '2021년 2월 10일',
		Category: [
			{
				id: 1,
				name: '카테고리1',
				num: 1,
			},
			{
				id: 2,
				name: '카테고리2',
				num: 1,
			},
		],
	},
	{
		id: 2,
		thumbnail: 'https://media.vlpt.us/images/minsgy/post/8e1e5456-4a4b-4d42-b4bd-29040fc879bc/about_img.png',
		title: '포스트 제목',
		description:
			'못하다 밝은 웅대한 현저하게 든 아름 원하고, 목숨을 약동하다. 것은 예가 같은 길지 힘차게 그것은 투명하되 이것이다. 길지 전인 곧 내는 거친 그들은 사랑의 얼음과 위하여서 잠을 자...',
		createAt: '2021년 2월 10일',
		Category: [
			{
				id: 1,
				name: '카테고리1',
				num: 1,
			},
			{
				id: 2,
				name: '카테고리2',
				num: 1,
			},
		],
	},
	{
		id: 3,
		thumbnail: 'https://media.vlpt.us/images/minsgy/post/8e1e5456-4a4b-4d42-b4bd-29040fc879bc/about_img.png',
		title: '포스트 제목',
		description:
			'못하다 밝은 웅대한 현저하게 든 아름 원하고, 목숨을 약동하다. 것은 예가 같은 길지 힘차게 그것은 투명하되 이것이다. 길지 전인 곧 내는 거친 그들은 사랑의 얼음과 위하여서 잠을 자...',
		createAt: '2021년 2월 10일',
		Category: [
			{
				id: 1,
				name: '카테고리1',
				num: 1,
			},
			{
				id: 2,
				name: '카테고리2',
				num: 1,
			},
		],
	},
	{
		id: 4,
		thumbnail: 'https://media.vlpt.us/images/minsgy/post/8e1e5456-4a4b-4d42-b4bd-29040fc879bc/about_img.png',
		title: '포스트 제목',
		description:
			'못하다 밝은 웅대한 현저하게 든 아름 원하고, 목숨을 약동하다. 것은 예가 같은 길지 힘차게 그것은 투명하되 이것이다. 길지 전인 곧 내는 거친 그들은 사랑의 얼음과 위하여서 잠을 자...',
		createAt: '2021년 2월 10일',
		Category: [
			{
				id: 1,
				name: '카테고리1',
				num: 1,
			},
			{
				id: 2,
				name: '카테고리2',
				num: 1,
			},
		],
	},
];

const PostContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
`;

const PostCards = () => {
	return (
		<PostContainer>
			{dummyPost.map((c, i) => (
				<PostCardComponent key={i} post={c} />
			))}
		</PostContainer>
	);
};

export default PostCards;
