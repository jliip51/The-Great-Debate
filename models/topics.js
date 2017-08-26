'use strict';

//Need to add attributes (i.e. AllowNull, Validate) to model definition.
module.exports = function(sequelize, DataTypes) {
  var Topics = sequelize.define('Topics', {
    category: DataTypes.STRING,
    question: DataTypes.STRING,
    start: DataTypes.DATE,
    expired: DataTypes.BOOLEAN,
    post_count: DataTypes.INTEGER,
  });
   Topics.associate = function(models) {
        Topics.hasMany(models.Posts, {
          onDelete: 'CASCADE'
        });
      };
  return Topics;
};
