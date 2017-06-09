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
import { Apis } from './../../apis/apis';
import { API_CONFIG } from './../../apis/config';
import { getSign } from './../../config/encrypt';
import './Login.css';

class Login extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: '0',
      otpCode: '',
      focus: {x: 0, y: 1},
      vPosition: {x: 0, y: 1},
      minX: 0,
      maxX: 10,
      minY: 0,
      maxY: 1,
      loader: false,
      platform: 'smart_tv_samsung',
      device_id: '_a3l3rd7x6',
      version: '1.0.1',
      os: 'chrome',
      sign: null,
      redirect_to_otp: false,
      is_auth: false,
      device_token: null
    };

    this.handleKeyControl = this.handleKeyControl.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.getOTP = this.getOTP.bind(this);
    this.sendOTP = this.sendOTP.bind(this);
    this.autoLoader = this.autoLoader.bind(this);
    this.setVirtualKey = this.setVirtualKey.bind(this);
  }

  handleKeyControl = (event) => {
    event.preventDefault();
    const keyCode = event.keyCode;
    switch (keyCode) {
      case KEYMAP.RIGHT:
        if ( this.state.focus.x < this.state.maxX && this.state.focus.y === this.state.maxY )
          this.setState({focus: moveRight(this.state.focus)});
        break;
      case KEYMAP.LEFT:
        if ( this.state.focus.x > this.state.minX && this.state.focus.y === this.state.maxY )
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
    if (this.state.redirect_to_otp) {
      this.setState({
        otpCode: (this.state.otpCode.length < 4) ? this.state.otpCode.concat(value) : this.state.otpCode
      });
    } else {
      this.setState({
        data: this.state.data.concat(value)
      });
    }
  };

  handleBackspace = () => {
    if (this.state.redirect_to_otp) {
      this.setState({
        otpCode: (this.state.otpCode.length > 0) ? this.state.otpCode.slice(0, -1) : this.state.otpCode
      });
    } else {
      this.setState({
        data: (this.state.data.length > 1) ? this.state.data.slice(0, -1) : this.state.data
      });
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyControl);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyControl);
  }

  setVirtualKey(){
    const vKeys = [];
    for(var i=0; i<this.state.maxX; i++){
      vKeys[i] = {
        x: this.state.vPosition.x + i,
        y: this.state.vPosition.y,
        value: (i + 1) % 10
      }
    }
    return vKeys;
  }

  getOTP(e) {
    e.preventDefault();
    let NEW_API_CONFIG = Object.assign({}, API_CONFIG);
    NEW_API_CONFIG.body = `mobile=${this.state.data}&type=login`;
    NEW_API_CONFIG.method = 'POST';

    fetch(Apis.AUTH_GET_OTP.url, NEW_API_CONFIG).then(response => {
      return response.json()
    }).then(res => {
      console.log('login', res);
      if (!res.code) {
        this.setState({
          focus: {x: 0, y: 2},
          vPosition: {x: 0, y: 2},
          minX: 0,
          maxX: 10,
          minY: 0,
          maxY: 2,
          redirect_to_otp: true,
        });
      }
    })
  }

  sendOTP(e) {
    e.preventDefault();
    console.log('send otp');
    let NEW_API_CONFIG = Object.assign({}, API_CONFIG);
    NEW_API_CONFIG.body = `mobile=${this.state.data}&otp=${this.state.otpCode}&device_id=${this.state.device_id}`;
    NEW_API_CONFIG.method = Apis.AUTH_VALIDATE.method;
    fetch(Apis.AUTH_VALIDATE_OTP.url, NEW_API_CONFIG).then(response => {
      return response.json()
    }).then(res => {
      if (!res.code) {
        this.setState({is_auth: true, access_token: res.data.access_token});
        localStorage.setItem('is_login', true);
        this.props.history.push('/');
      }
    })
  }

  autoLoader() {
    if (this.state.loader) {
      return;
    }
    let NEW_API_CONFIG = Object.assign({}, API_CONFIG);
    fetch(Apis.GET_RANDOM_KEY.url, NEW_API_CONFIG).then(response => {
      return response.json()
    }).then(res => {
      let NEW_API_CONFIG = Object.assign({}, API_CONFIG);
      let sign = getSign(this.state.os, this.state.platform, this.state.device_id, res.data);
      NEW_API_CONFIG.body = `platform=${this.state.platform}&device_id=${this.state.device_id}&version=${this.state.version}&os=${this.state.os}&sign=${sign}`
      NEW_API_CONFIG.method = Apis.AUTH_VALIDATE.method;

      fetch(Apis.AUTH_VALIDATE.url, NEW_API_CONFIG).then(response => {
        return response.json()
      }).then(res => {
        if (!res.code) {
          this.setState({loader: true});
          console.log('Success validate step one');
        } else {
          console.dir('validate fail');
        }
      })
    })
  }

  render() {
    let input
    const vKeys = this.setVirtualKey();
    const otps = (this.state.otpCode) ? this.state.otpCode.split('') : [];
    this.autoLoader();
    return (
      <div className="login">
        {this.state.redirect_to_otp ? (
          <div className="otp">
            <div className="text-center">
              Vui lòng nhập mã xác nhận gồm 4 số vừa được gửi tới số điện thoại {this.state.data}
            </div>
            <form onSubmit={this.sendOTP}>
              <div className="user-data">
                <input type="text" value={(otps.length > 0) ? otps[0] : ''} className="otp-code" />
                <input type="text" value={(otps.length > 1) ? otps[1] : ''} className="otp-code"  />
                <input type="text" value={(otps.length > 2) ? otps[2] : ''} className="otp-code" />
                <input type="text" value={(otps.length > 3) ? otps[3] : ''} className="otp-code" />
              </div>
              <br/>
              <button type="submit" className={
                (this.state.focus.x <= this.state.maxX && this.state.focus.y === 0) ? 'btn btn-gray submit-login focus' :
                  'btn btn-gray submit-login'
              }>
                TIẾP TỤC
              </button>
              <br className="line-break"/>
              <button className={
                (this.state.focus.x <= this.state.maxX && this.state.focus.y === 1) ? 'btn btn-gray submit-login focus' :
                  'btn btn-gray submit-login'
              }>
                KHÔNG NHẬN ĐƯỢC MÃ? GỬI LẠI!
              </button>
              {(this.state.is_auth)?' Success':null}
              {(this.state.access_token)?`| access_token: ${this.state.access_token}`: null}
            </form>
          </div>
        ) : (
          <form className="login-form" onSubmit={this.getOTP}>
            <input type="text" className="login-data" ref={node => {input = node}} readOnly value={this.state.data} /><br />
            <button type="submit" className={
              (this.state.focus.x <= this.state.maxX && this.state.focus.y === 0) ?
                'btn btn-gray submit-login focus' :'btn btn-gray submit-login'}>
              Tiếp tục
            </button>
          </form>
        )}
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
              (this.state.focus.x === this.state.maxX && this.state.focus.y === this.state.maxY) ? 'btn btn-gray key-item key-del focus' :
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

Login.defaultProps = {
  data: '0',
  focus:{x: 0, y: 1},
  minX: 0,
  maxX: 10,
  minY: 0,
  maxY: 1
};

export default Login;
