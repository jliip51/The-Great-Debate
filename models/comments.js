'use strict';

//Need to add attributes (i.e. AllowNull, Validate) to model definition.
module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define('Comments', {
    body: {
      allowNull: false,
      type: DataTypes.TEXT,
      len: [1]
    },
    votes: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    links: {
      type: DataTypes.TEXT,
  }
  });
    Comments.associate = function(models) {
      Comments.belongsTo(models.Users, {
      });

      Comments.belongsTo(models.Posts, {
      });
    };
  return Comments;
};
