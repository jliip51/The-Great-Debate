'use strict';

//Need to add attributes (i.e. AllowNull, Validate) to model definition.
module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define('Posts', {
    category: DataTypes.STRING,
    topic: DataTypes.STRING,
    description: DataTypes.TEXT,
    start: DataTypes.DATE,
    expired: DataTypes.BOOLEAN,
    comment_count: DataTypes.INTEGER
  });
   Posts.associate = function(models) {
        Posts.hasMany(models.Comments, {
          onDelete: 'CASCADE'
        });
  };
  return Posts;
};
