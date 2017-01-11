import { combineReducers } from 'redux'
import { SELECT_GIT, REQUEST_GIT, RECEIVE_GIT } from '../actions'

function selectedGitStream(state = '', action) {
  switch (action.type) {
    case SELECT_GIT:
      return action.gitStream;
    default:
      return state;
  }
}

function streams(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_GIT:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_GIT:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.gitDatas,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function streamsByGitStream(state = {}, action) {
  switch (action.type) {
    case REQUEST_GIT:
    case RECEIVE_GIT:
      return Object.assign({}, state, {
        [action.gitStream]: streams(state[action.gitStream], action)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  streamsByGitStream,
  selectedGitStream
});

export default rootReducer;