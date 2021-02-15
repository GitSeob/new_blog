const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
	static init(sequelize) {
		return super.init(
			{
				name: {
					type: DataTypes.STRING(50),
					allowNull: false,
				},
			},
			{
				modelName: "CategoryPost",
				tableName: "categoryPosts",
				paranoid: true,
				charset: "utf8mb4",
				collate: "utf8mb4_general_ci", // 한글 저장
				sequelize,
			}
		);
	}
	static associate(db) {
		db.CategoryPost.belongsTo(db.Category, {onDelete: 'CASCADE'});
		db.CategoryPost.belongsTo(db.User, {onDelete: 'CASCADE'});
	}
};
