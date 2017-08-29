'use strict';

//Need to add attributes (i.e. AllowNull, Validate) to model definition.
module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define('Posts', {
    category: {
      allowNull: false,
      type: DataTypes.STRING,
      len: [1, 20]
    },
    topic: {
      allowNull: false,
      type: DataTypes.STRING,
      len: [1, 50]
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
      len: [1, 100]
    },
    start: {
      allowNull: false,
      type: DataTypes.DATE
    },
    expired: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    comment_count: {
      defaultValue: 0,
      type: DataTypes.INTEGER
   }
  });
   Posts.associate = function(models) {
        Posts.hasMany(models.Comments, {
          foreignKey: {
            allowNull: false
          },
          onDelete: "CASCADE"
        });
  };
  return Posts;
};
