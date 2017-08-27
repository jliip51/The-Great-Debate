'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
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
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
      Users.associate = function(models) {
        Users.hasMany(models.Comments, {
          onDelete: 'CASCADE'
        });
      };
  return Users;
};
