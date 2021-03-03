import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

interface DisqusProps {
	id: number;
}

const Disqus = ({ id }: DisqusProps) => {
	return (
		<>
			<DiscussionEmbed
				shortname="gitseob-blog"
				config={{
					url: `${process.env.DISQUS_URL}${id}`,
					title: `gitseob-post-${id}`,
					identifier: `gitseob-post-${id}`,
				}}
			/>
		</>
	);
};

export default Disqus;
