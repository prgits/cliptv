import { ActionTypes } from '../action-types/track';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TRACKS_SET:
      return setTracks(state, action);
    default:
      return state;
  }
}

function setTracks(state, action) {
  const {tracks} = action;
  return [...state, ...tracks];
}