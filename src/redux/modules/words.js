import { restApp } from 'app';
import sift from 'sift';

const LOAD = 'redux-example/word/LOAD';
const LOAD_SUCCESS = 'redux-example/word/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/word/LOAD_FAIL';
const ADD_ITEM = 'redux-example/word/ADD_ITEM';
const REMOVED_ITEM = 'redux-example/word/REMOVED_ITEM';
const UPDATED_ITEM = 'redux-example/word/UPDATED_ITEM';

const appService = restApp.service('words');

const initialState = {
  loaded: false,
  words: [],
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
        words: action.result.data,
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
        words: state.words.concat(action.item),
        count: state.count + 1
      };
    case REMOVED_ITEM:
      return {
        ...state,
        words: state.words.filter(item => item.id !== action.item.id),
        count: state.count - 1
      };
    case UPDATED_ITEM:
      return {
        ...state,
        words: state.words.map(item => (item.id === action.item.id ?
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
  return globalState.words && globalState.words.loaded;
}

export function load(query, globalState) {
  if (!query) {
    query = {};
  }
  query.$sort = { random: 1 };

  const userPoint = globalState.auth.user.point;
  const levels = globalState.level.levels;
  const possibleLevels = sift({ point: { $lte: userPoint } }, levels);
  console.log(possibleLevels);

  query.level = possibleLevels[possibleLevels.length - 1].level;

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () =>
      appService
        .find({ query })
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
