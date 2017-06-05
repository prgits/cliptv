import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="welcome">
        <div className="welcome-content">
          <Link to="/register-trial" className="btn btn-gray">Dùng thử 1 tháng miễn phí</Link>
          <Link to="/login" className="btn btn-gray btn-login ml10">Đăng nhập</Link>
        </div>
      </div>
    );
  }
}

export default Home;