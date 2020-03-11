'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Task extends Model{}

  Task.init(
     {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {sequelize,tableName:'Tasks'}
  )

  
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User,{foreignKey:'userId'})
  };
  return Task;
};