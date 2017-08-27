'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate:{
        isEmail:true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
      User.associate = function(models) {
        User.hasMany(models.Comments, {
          onDelete: 'CASCADE'
        });
      };
  return User;
};
