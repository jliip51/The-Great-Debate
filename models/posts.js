'use strict';

//Need to add attributes (i.e. AllowNull, Validate) to model definition.
module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define('Posts', {
    headline: DataTypes.STRING,
    position: DataTypes.BOOLEAN,
    body: DataTypes.TEXT,
    links: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Posts.belongsTo(models.User, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
      },
      //Look into whether we can support polymorphic associations. Don't think Sequelize can support.

      // associate: function(models) {
      //   Posts.belongsTo(models.Topics, {
      //     foreignKey: 'TopicsId',
      //     onDelete: 'CASCADE'
      //   });
      // }
    }
  });
  return Posts;
};
