import React, {Component} from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom';
import Home from './containers/Home/Home';
import RegisterTrial from './containers/RegisterTrial/RegisterTrial';
import Login from './containers/Login/Login';

class AllRoutes extends Component{
  render(){
    return (
      <div>
        <Switch>
          <Route path="/register-trial" component={RegisterTrial}/>
          <Route path="/login" component={Login}/>
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    )
  }
}
export default AllRoutes;