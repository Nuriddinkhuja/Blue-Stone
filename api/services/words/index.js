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

  app.use('/words', service(options));

  app.service('words').hooks(hooks);
}
