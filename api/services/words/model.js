'use strict';

// user-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');


// declaring database table called 'words'
module.exports = function(sequelize) {
  const words = sequelize.define('words', {
    en: {
      type: Sequelize.STRING,
      allowNull: false
    },
    uz: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
    	type: Sequelize.DATE,
    	defaultValue: Sequelize.NOW,
    	validate: {
    		isDate: true
    	}
    },
    level: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    freezeTableName: true
  });

  words.sync();

  return words;
};