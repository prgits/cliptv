import {ActionTypes} from '../action-types/track';

export function setTracks(tracks) {
  return {
    type: ActionTypes.TRACKS_SET,
    tracks
  };
}
