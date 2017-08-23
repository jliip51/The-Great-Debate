'use strict';

//Need to add attributes (i.e. AllowNull, Validate) to model definition.
module.exports = function(sequelize, DataTypes) {
  var Topics = sequelize.define('Topics', {
    category: DataTypes.STRING,
    question: DataTypes.STRING,
    start: DataTypes.DATE,
    expired: DataTypes.BOOLEAN,
    post_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Topics.hasMany(models.Posts);
      }
    }
  });
  return Topics;
};
