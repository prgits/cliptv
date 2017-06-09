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
import './VirtualKeyboard.css';

class VirtualKeyboard extends Component {
  constructor( props ) {
    super( props );
    this.handleKeyControl = this.handleKeyControl.bind(this);
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
    const {startPoint} = this.props;
    const vKeys = [];
    for (var i =0; i<10; i++){
      vKeys[i] = {
        x: i + startPoint.x,
        y: startPoint.y,
        value: (i + 1) % 10
      };
    }
    return (
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
    );
  }
}

VirtualKeyboard.propTypes = {
  startPoint: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  focus: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  handleKeySelect: PropTypes.func,
};

export default VirtualKeyboard;
