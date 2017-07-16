import users from './users';
import words from './words';
import level from './level';
const Sequelize = require('sequelize');

export default function services() {
  const app = this;
  const sequelize = new Sequelize('postgres://postgres:sahovat@localhost:5432/bluestone', {
    dialect: 'postgres',
    logging: false
  });

  app.set('sequelize', sequelize);
  app.configure(users);
  app.configure(words);
  app.configure(level);
}
