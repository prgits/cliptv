import React from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom'
import AllRoutes from '../../routes';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="main-content">
        <Router>
          <AllRoutes/>
        </Router>
      </div>
    );
  }
}

export default App;