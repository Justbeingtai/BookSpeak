// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Book extends Model {}

// Book.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     googleBookId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     author: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'users',
//         key: 'id',
//       },
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'book',
//   }
// );

// module.exports = Book;
