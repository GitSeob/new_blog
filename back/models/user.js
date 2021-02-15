const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
	static init(sequelize) {
		return super.init(
			{
				username: {
					type: DataTypes.STRING(100),
					allowNull: false,
					unique: true
				},
				password: {
					type: DataTypes.STRING(300),
					allowNull: false,
				}
			},
			{
				modelName: "User",
				tableName: "users",
				paranoid: true,
				charset: "utf8mb4",
				collate: "utf8mb4_general_ci", // 한글 저장
				sequelize,
			}
		);
	}
	static associate(db) {
		db.User.hasMany(db.Post);
	}
};
