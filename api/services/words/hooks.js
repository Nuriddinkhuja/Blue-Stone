import hooks from 'feathers-hooks-common';
import auth from 'feathers-authentication';
import { required } from 'utils/validation';
import { validateHook as validate } from 'hooks';


function populateUser() {
  return hooks.populate({
    profile:true
  });
}

const messagesHooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
             auth.hooks.authenticate('jwt')
     ],
    update: [
             auth.hooks.authenticate('jwt')
     ],
    patch: hooks.disable(),
    remove: [
         auth.hooks.authenticate('jwt')
	]
  },
  after: {
    all: [],
    find: [
      // populateUser()
    ],
    get: [
      // populateUser()
    ],
    create: [
      // populateUser()
    ],
    update: [],
    patch: [],
    remove: []
  }
};

export default messagesHooks;