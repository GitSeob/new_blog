import styled from 'styled-components';

export const PostCard = styled.div`
	width: 290px;
	border-radius: 1rem;
	box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.16);
	margin: 20px;
	overflow: hidden;
	transition: 0.3s;
	background: #fff;

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
		img {
			transform: scale(1.05);
		}
	}

	@media screen and (max-width: 1000px) {
		width: calc(50% - 40px);
	}

	@media screen and (max-width: 700px) {
		width: calc(100% - 40px);
	}
`;

export const Thumbnail = styled.a`
	& > div {
		width: 100%;
		position: relative;
		overflow: hidden;

		& > div {
			padding-top: 70%;
		}
		& > img {
			position: absolute;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			display: block;
			object-fit: cover;
			transition: 0.3s;
		}
	}
`;

export const Contents = styled.div`
	width: 100%;
	padding: 1rem;

	& > a {
		& > h4,
		& > p {
			margin-bottom: 10px;
		}
		& > h4 {
			font-size: 1.125rem;
			line-height: 1.5;
			word-break: break-word;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		& > p {
			color: #495057;
			line-height: 1.5;
			height: 4rem;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;

			&.date {
				height: 1rem;
				font-size: 12px;
			}
		}
	}
`;
