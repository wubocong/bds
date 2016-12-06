import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { push } from 'react-router-redux';
import FlatButton from 'material-ui/FlatButton';

import HomeIconButton from '../../components/HomeIconButton';
import { OPEN_SNACKBAR, CONFIG_APPBAR, OPEN_LOADING_DIALOG, CLOSE_LOADING_DIALOG } from '../App/constants';
import { HOST, SYSTEM_NAME } from '../../constants';
import Storage from '../../models/Storage';

const RadioButtonStyle = {
  display: 'inline-block',
  width: '33%'
};

class Login extends Component {

  constructor(props) {

    super(props);
    this.state = {
      account: 'ls',
      password: 'ls',
      role: 'teacher'
    };
  }

  // 检查是否已登录
  componentWillMount() {
    const token = Storage.getToken();
    const { dispatch } = this.props;
    if (token) {
      const user = Storage.getUser();
      dispatch(push('/' + user.role));
    } else {
      dispatch({
        type: CONFIG_APPBAR,
        appbarConfig: {
          title: SYSTEM_NAME,
          appbarRightElement: null,
          isAppbarOpen: true,
          appbarLeftElement: <HomeIconButton href="/" />
        }
      });
    }
  }

  setAccount = event => {
    this.setState({
      account: event.target.value
    });
  }

  setPassword = event => {
    this.setState({
      password: event.target.value
    });
  }

  setRole = event => {
    this.setState({
      role: event.target.value
    });
  }

  openLoadingDialog = () => {
    const { dispatch } = this.props;
    dispatch({
      type: OPEN_LOADING_DIALOG
    });
  }

  closeLoadingDialog = () => {
    const { dispatch } = this.props;
    dispatch({
      type: CLOSE_LOADING_DIALOG
    });
  }

  loginAuth = () => {
    const { dispatch } = this.props;
    const { account, password, role } = this.state;

    if (!account) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '请输入账号！'
      });
    } else if (!password) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '请输入密码！'
      });
    } else if (!role) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '请选择身份！'
      });
    } else {
      this.openLoadingDialog();
      fetch(HOST + '/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          account,
          password,
          role
        })
      }).then(response => {

        this.closeLoadingDialog();

        // 验证失败
        if (response.status === 500) {
          dispatch({
            type: OPEN_SNACKBAR,
            snackbarText: '服务器错误！'
          });
        } else if (response.status !== 200) {
          this.setState({
            password: ''
          });
          dispatch({
            type: OPEN_SNACKBAR,
            snackbarText: '请检查账号、密码或者身份是否正确！'
          });
        } else { // 验证成功
          response.json().then(json => {
            let { token, user } = json;

            // 保存token
            Storage.setToken(token);

            // 保存user
            Storage.setUser(user);

            // 路由跳转
            dispatch(push('/' + user.role));
          });
        }
      }, error => { // 网络错误
        this.closeLoadingDialog();
        this.setState({
          isLogining: false
        });
        dispatch({
          type: OPEN_SNACKBAR,
          snackbarText: '网络错误！请检查网络情况！'
        });
      });
    }
  }

  render() {
    const { account, password, role, isLogining } = this.state;
    return (
      <div className="rightIn" style={{
        maxWidth: 400,
        padding: 20,
        margin: '80px auto 30px auto'
      }}>
        <TextField floatingLabelText="账号" value={account} fullWidth className="text-field" onChange={this.setAccount} />
        <TextField type="password" floatingLabelText="密码" value={password} fullWidth className="text-field" onChange={this.setPassword} />
        <RadioButtonGroup name="role" defaultSelected={role} style={{
          margin: '20px 0'
        }} onChange={this.setRole}>
          <RadioButton value="admin" label="管理员" style={RadioButtonStyle} />
          <RadioButton value="teacher" label="教师" style={RadioButtonStyle} />
          <RadioButton value="student" label="学生" style={RadioButtonStyle} />
        </RadioButtonGroup>
        <RaisedButton label="登录" primary fullWidth onTouchTap={this.loginAuth} />
        <Link to="/help" style={{
          textAlign: 'center',
          display: 'block',
          marginTop: 10
        }}><FlatButton label="忘记密码?" /></Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};
const mapDispathToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Login);