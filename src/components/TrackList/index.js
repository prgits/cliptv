import {connect} from 'react-redux';
import TrackList from './TrackList';
import * as actions from '../../actions';
import store from '../../store';

const tracks = [
  {
    id: 1,
    title: 'Em của ngày hôm qua'
  },
  {
    id: 2,
    title: 'Cơn mưa ngang qua'
  }
];

store.dispatch(actions.setTracks(tracks));

export default connect(({tracks}) => ({tracks}))(TrackList);
