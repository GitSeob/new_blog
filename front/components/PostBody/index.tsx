import React, { useRef, MutableRefObject, useEffect } from 'react';
import marked from 'marked';
import Prism from 'prismjs';
import { BodyDiv } from './style';

interface PostBodyProps {
	title?: string;
	body: string;
	setTitle?: boolean;
}

const PostBody = ({ title = '', body, setTitle = true }: PostBodyProps) => {
	const markedDivRef = useRef() as MutableRefObject<HTMLDivElement>;

	useEffect(() => {
		if (markedDivRef) {
			markedDivRef.current.innerHTML = marked(body);
		}

		Prism.highlightAll();
	}, [body]);

	return (
		<BodyDiv>
			{setTitle && <h1>{title}</h1>}
			<div ref={markedDivRef}>{body}</div>
		</BodyDiv>
	);
};

export default PostBody;
