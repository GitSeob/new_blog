const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: {
					type: DataTypes.STRING(50),
					allowNull: false,
				},
				description: {
					type: DataTypes.STRING(160),
					allowNull: false,
				},
				thumbnail: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				body: {
					type: DataTypes.TEXT,
					allowNull: false,
				},
				is_visible: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
					defaultValue: true,
				}
			},
			{
				modelName: "Post",
				tableName: "posts",
				paranoid: true,
				charset: "utf8mb4",
				collate: "utf8mb4_general_ci", // 한글 저장
				sequelize,
			}
		);
	}
	static associate(db) {
		db.Post.belongsTo(db.User);
		db.Post.belongsToMany(db.Category, {
			through: db.CategoryPost,
			as: "PCategories"
		});
	}
};
