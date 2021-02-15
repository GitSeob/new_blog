require('dotenv').config();

module.exports = {
	"development": {
		"uri": "http://localhost:3075",
		"username": process.env.DB_USER,
		"password": process.env.DB_PASSWORD,
		"database": process.env.DEV_DB_NAME,
		"dialect": "mysql",
	},
	"test": {
		"username": process.env.DB_USER,
		"password": process.env.DB_PASSWORD,
		"database": process.env.DB_NAME,
		"dialect": "mysql",
	},
	"production": {
		"uri": "https://dev.anjoy.info",
		"username": process.env.DB_USER,
		"password": process.env.DB_PASSWORD,
		"database": process.env.DB_NAME,
		"dialect": "mysql",
	}
}
