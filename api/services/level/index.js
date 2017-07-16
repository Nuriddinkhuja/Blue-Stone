const service = require('../sequelize/index');
const model = require('./model');
import hooks from './hooks';

export default function newService() {
  const app = this;

  const options = {
    Model: model(app.get('sequelize')),
    paginate: {
      default: 6,
      max: 25
    },
    sequelize: app.get('sequelize')
  };

  app.use('/level', service(options));

  app.service('level').hooks(hooks);
}
