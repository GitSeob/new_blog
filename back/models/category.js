const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
	static init(sequelize) {
		return super.init(
			{
				name: {
					type: DataTypes.STRING(50),
					allowNull: false,
					unique: true,
				},
			},
			{
				modelName: "Category",
				tableName: "categories",
				paranoid: true,
				charset: "utf8mb4",
				collate: "utf8mb4_general_ci", // 한글 저장
				sequelize,
			}
		);
	}
	static associate(db) {
		db.Category.belongsToMany(db.Post, {
			through: db.CategoryPost,
			as: "CPosts"
		});
	}
};
