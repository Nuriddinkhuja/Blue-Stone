'use strict';

// user-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');


// declaring database table called 'level'
module.exports = function(sequelize) {
  const level = sequelize.define('level', {
    level: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    point: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    createdAt: {
    	type: Sequelize.DATE,
    	defaultValue: Sequelize.NOW,
    	validate: {
    		isDate: true
    	}
    }
  }, {
    freezeTableName: true
  });

  level.sync();

  return level;
};