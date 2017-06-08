import React, {Component} from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import RegisterTrial from './components/RegisterTrial/RegisterTrial';
import Login from './components/Login/Login';
import TrackList from './components/TrackList/index';

class AllRoutes extends Component{
  render(){
    return (
      <div>
        <Switch>
          <Route path="/track-list" component={TrackList}/>
          <Route path="/register-trial" component={RegisterTrial}/>
          <Route path="/login" component={Login}/>
          <Route path="/" component={Welcome}/>
        </Switch>
      </div>
    )
  }
}
export default AllRoutes;