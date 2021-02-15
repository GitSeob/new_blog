import React from 'react';
import useInput from '@hooks/useInput';
import Posting from './index';

const ExistingPost = () => {
	const [title, onChangeTitle] = useInput('');
	const [body, onChangeBody] = useInput('');
	const [tog, setTog] = React.useState(false);

	return (
		<>
			<Posting />
		</>
	);
};

export default ExistingPost;
