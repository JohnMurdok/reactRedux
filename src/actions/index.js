import fetch from 'isomorphic-fetch';
import testData from '../test.json';

//Entering git select
export const SELECT_GIT = 'SELECT_GIT'
export function selectGit(gitStream) {
  return {
    type: SELECT_GIT,
    gitStream
  };
}

//Telling app that we have to start request
export const REQUEST_GIT = 'REQUEST_GIT'
function requestGit(gitStream) {
  return {
    type: REQUEST_GIT,
    gitStream
  }
}

//Receiving data from git stream
export const RECEIVE_GIT = 'RECEIVE_GIT';
function receiveStreams(gitStream, datas) {
  return {
    type: RECEIVE_GIT,
    gitStream,
    gitDatas: datas,
    receivedAt: Date.now()
  }
}

//Fetching gitStream
export function fetchGitStream(gitStream = "") {
  return function (dispatch) {
    //Telling dispatcher that we start the request
    dispatch(requestGit(gitStream));

    return fetch(gitStream)
      .then(response => response.json())
      .then(datas => {
        if(!Array.isArray(datas)){
          dispatch(receiveStreams(gitStream, []))
          return;
        }
        dispatch(receiveStreams(gitStream, datas))
      }).catch(err =>
        dispatch(receiveStreams(gitStream, []))
      );
  }
}

//Checking if you have streams
function shouldFetchStreams(state, gitStream) {
  const stream = state.streamsByGitStream[gitStream];
  if(gitStream === ""){
	  return false;
  }
  else if (!stream || stream.items.length === 0) {
    return true;
  } else if (stream.isFetching) {
    return false;
  } else {
    //I could have add a rule that check if data is older than 5 minutes using the receivedAt value
    return false;
  }
}

//Using cache if we already had the data
export function fetchStreamsIfNeeded(gitStream) {
  return (dispatch, getState) => {
    if (shouldFetchStreams(getState(), gitStream)) {
      return dispatch(fetchGitStream(gitStream));
    } else {
      return Promise.resolve();
    }
  };
}