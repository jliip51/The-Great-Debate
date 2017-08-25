'use strict';

//Need to add attributes (i.e. AllowNull, Validate) to model definition.
module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define('Posts', {
    headline: DataTypes.STRING,
    position: DataTypes.BOOLEAN,
    body: DataTypes.TEXT,
    links: DataTypes.TEXT
  });
    Posts.associate = function(models) {
      Posts.belongsTo(models.User, {
      });

      Posts.belongsTo(models.Topics, {
      });
    };
  return Posts;
};
