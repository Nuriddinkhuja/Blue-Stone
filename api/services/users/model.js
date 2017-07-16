'use strict';

// user-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const user = sequelize.define('users', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    name: {
    	type: Sequelize.STRING,
    	allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    point: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    pro: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true
  });

  user.sync();

  return user;
};
