import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {KEYMAP} from '../../utils/keymap';
import {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  Enter
} from '../../utils/key-actions';
import './Login.css';

class Login extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: '0',
      focus: {x: 0, y: 1},
      minX: 0,
      maxX: 10,
      minY: 0,
      maxY: 1
    };

    this.handleKeyControl = this.handleKeyControl.bind(this);
    // this.handleKeySelect = this.handleKeySelect.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
  }

  handleKeyControl = (event) => {
    event.preventDefault();
    const keyCode = event.keyCode;
    switch (keyCode) {
      case KEYMAP.RIGHT:
        if ( this.state.focus.x < this.state.maxX && this.state.focus.y > 0 )
          this.setState({focus: moveRight(this.state.focus)});
        break;
      case KEYMAP.LEFT:
        if ( this.state.focus.x > this.state.minX && this.state.focus.y > 0 )
          this.setState({focus: moveLeft(this.state.focus)});
        break;
      case KEYMAP.UP:
        if ( this.state.focus.y > this.state.minY )
          this.setState({focus: moveUp(this.state.focus)});
        break;
      case KEYMAP.DOWN:
        if ( this.state.focus.y < this.state.maxY )
          this.setState({focus: moveDown(this.state.focus)});
        break;
      case KEYMAP.ENTER:
        Enter();
        break;
      default:
        break;
    }
  };

  handleKeySelect = (value) => {
    console.log(value);
    this.setState({
      data: this.state.data.concat(value)
    });
  };

  handleBackspace = () => {
    this.setState({
      data: (this.state.data.length > 1) ? this.state.data.slice(0, -1) : this.state.data
    });
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyControl);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyControl);
  }

  render() {
    let input;
    const vKeys = [
      {x: 0, y: 1, value: 1}, {x: 1, y: 1, value: 2},
      {x: 2, y: 1, value: 3}, {x: 3, y: 1, value: 4},
      {x: 4, y: 1, value: 5}, {x: 5, y: 1, value: 6},
      {x: 6, y: 1, value: 7}, {x: 7, y: 1, value: 8},
      {x: 8, y: 1, value: 9}, {x: 9, y: 1, value: 0}
    ];

    return (
      <div className="login">
        <div className="login-form">
          <input type="text" className="login-data" ref={node => {input = node}} readOnly value={this.state.data} /><br />
          <button type="submit" className={
            (this.state.focus.x <= this.state.maxX && this.state.focus.y === 0) ? 'btn btn-gray submit-login focus' :
              'btn btn-gray submit-login'
          }>
            Tiếp tục
          </button>
        </div>
        <div className="virtual-keyboard">
          {vKeys.map(point =>
            <button key={point.value} className={
              (this.state.focus.x === point.x && this.state.focus.y === point.y) ? 'btn btn-gray key-item focus' :
                'btn btn-gray key-item'
            } onClick={this.handleKeySelect.bind(this, point.value)}>
              {point.value}
            </button>
          )}
          <button key={11} className={
            (this.state.focus.x === this.state.maxX && this.state.focus.y === 1) ? 'btn btn-gray key-item key-del focus' :
              'btn btn-gray key-item key-del'
          } onClick={this.handleBackspace}></button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  data: PropTypes.string.isRequired,
  focus: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  minX: PropTypes.number.isRequired,
  maxX: PropTypes.number.isRequired,
  minY: PropTypes.number.isRequired,
  maxY: PropTypes.number.isRequired
};

Login.defaultProps={
  data: '0',
  focus:{x: 0, y: 1},
  minX: 0,
  maxX: 10,
  minY: 0,
  maxY: 1
};

export default Login;
