const service = require('../sequelize/index');
const user = require('./model');
import hooks from './hooks';

export default function userService() {
  const app = this;

  const options = {
    Model: user(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  app.use('/users', service(options));

  app.service('users').hooks(hooks);
}
