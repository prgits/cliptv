import React, {Component} from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom';
import Home from './components/Home/Home';
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
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    )
  }
}
export default AllRoutes;