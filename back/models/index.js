const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};


const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		maxConcurrentQueries: 100,
		dialect: 'mysql',
		pool: { maxConnections: 5, maxIdleTime: 30},
		logging: false,
	}
);

//////// DB Models require
const user = require('./user');
const post = require('./post');
const category = require('./category');
const categoryPost = require('./categoryPost');

//////// DB that import from require connect to db var
db.User = user;
db.Post = post;
db.Category = category;
db.CategoryPost = categoryPost;

Object.keys(db).forEach(async (modelName) => {
	await db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
