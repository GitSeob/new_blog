require('dotenv').config();

module.exports = {
	webpack: (config) => {
		const prod = process.env.NODE_ENV === 'production';
		config.node = {
			fs: 'empty',
		};
		return { ...config, mode: prod ? 'production' : 'development' };
	},
	env: {
		SERVER_URL: process.env.NODE_ENV === 'production' ? process.env.PROD_SERVER_URL : process.env.DEV_SERVER_URL,
		DISQUS_URL: process.env.PROD_DISQUS_URL,
	},
};
