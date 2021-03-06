import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {KEYMAP} from '../../utils/keymap';
import {
  moveLeft,
  moveRight,
  Enter
} from '../../utils/key-actions';
import './Home.css';

class Home extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      focus: {x: 0, y: 0},
      minX: 0,
      maxX: 1,
    };

    this.handleKeyControl = this.handleKeyControl.bind(this);
  }

  handleKeyControl = (event) => {
    event.preventDefault();
    const keyCode = event.keyCode;
    switch (keyCode) {
      case KEYMAP.RIGHT:
        this.setState({focus: moveRight(this.state.focus, this.state.maxX)});
        break;
      case KEYMAP.LEFT:
        this.setState({focus: moveLeft(this.state.focus, this.state.minX)});
        break;
      case KEYMAP.ENTER:
        Enter();
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyControl);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyControl);
  }

  render() {
    return (
      <div className="welcome">
        <div className="welcome-content">
          <Link to="/register-trial" className={
            (this.state.focus.x === 0 && this.state.focus.y === 0) ? 'btn btn-gray focus' : 'btn btn-gray'
          }>
            Dùng thử 1 tháng miễn phí
          </Link>
          <Link to="/login" className={
            (this.state.focus.x === 1 && this.state.focus.y === 0) ? 'btn btn-gray btn-login ml10 focus':
            'btn btn-gray btn-login ml10'
          }>
            Đăng nhập
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;