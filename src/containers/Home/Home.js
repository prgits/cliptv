import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      focus: 1
    };
  }

  render() {
    return (
      <div className="welcome">
        <div className="welcome-content">
          <Link to="/register-trial" className={(this.state.focus === 1) ? 'btn btn-gray focus' : 'btn btn-gray'}>
            Dùng thử 1 tháng miễn phí
          </Link>
          <Link to="/login" className={this.state.focus === 2 ? 'btn btn-gray btn-login ml10 focus':
          'btn btn-gray btn-login ml10'}>
            Đăng nhập
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;