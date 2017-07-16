import { restApp } from 'app';

const LOAD = 'redux-example/level/LOAD';
const LOAD_SUCCESS = 'redux-example/level/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/level/LOAD_FAIL';
const ADD_ITEM = 'redux-example/level/ADD_ITEM';
const REMOVED_ITEM = 'redux-example/level/REMOVED_ITEM';
const UPDATED_ITEM = 'redux-example/level/UPDATED_ITEM';

const appService = restApp.service('level');

const initialState = {
  loaded: false,
  levels: [],
  count: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        levels: action.result.data,
        count: action.result.total
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case ADD_ITEM:
      return {
        ...state,
        levels: state.levels.concat(action.item),
        count: state.count + 1
      };
    case REMOVED_ITEM:
      return {
        ...state,
        levels: state.levels.filter(item => item.id !== action.item.id),
        count: state.count - 1
      };
    case UPDATED_ITEM:
      return {
        ...state,
        levels: state.levels.map(item => (item.id === action.item.id ?
            // transform the one with a matching id
            action.item :
            // otherwise return original todo
            item)
        )
      };
    default:
      return state;
  }
}

/*
* Actions
* * * * */

export function isLoaded(globalState) {
  return globalState.levels && globalState.levels.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () =>
      appService
        .find({
          query: {
            level: 1
          }
        })
        .then(page => ({ data: page.data, total: page.total }))
  };
}

export function addItem(item) {
  return { type: ADD_ITEM, item };
}

export function updatedItem(item) {
  return { type: UPDATED_ITEM, item };
}

export function removedItem(item) {
  return { type: REMOVED_ITEM, item };
}
