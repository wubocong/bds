import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Storage from '../models/Storage';
import { CHANGE_TITLE, OPEN_SNACKBAR } from '../containers/App/constants';

const changPasswordStyle = {
  maxWidth: 400,
  margin: '50px auto 20px auto',
  padding: '0 30px'
};
const buttonContainerStyle = {
  marginTop: 30,
  textAlign: 'center'
}
const buttonStyle = {
  margin: '10px'
};

class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: Storage.getUser(),
      oldPassword: '',
      newPassword: ''
    };
  }

  // 是否已登录
  componentWillMount() {
    const token = Storage.getToken();
    const { dispatch } = this.props;
    if (!token) {
      dispatch(push('/'));
    } else {
      dispatch({
        type: CHANGE_TITLE,
        title: '修改密码'
      });
    }
  }

  setOldPassword = event => {
    this.setState({
      oldPassword: event.target.value
    });
  }

  setNewPassword = event => {
    this.setState({
      newPassword: event.target.value
    });
  }

  changePassword = () => {
    const { oldPassword, newPassword, user } = this.state;
    const { dispatch } = this.props;
    if (!oldPassword) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '请输入原密码！'
      });
    } else if (!newPassword) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '请输入新密码！'
      });
    } else {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '修改成功！'
      });
      dispatch(push('/' + user.role));
    }
  }

  render() {
    const {user, oldPassword, newPassword } = this.state;
    return (
      <div style={changPasswordStyle} className="leftIn">
        <TextField fullWidth floatingLabelText="账号" defaultValue={user.account} disabled />
        <TextField onChange={this.setOldPassword} type="password" defaultValue={oldPassword} fullWidth floatingLabelText="原密码" />
        <TextField onChange={this.setNewPassword} type="password" defaultValue={newPassword} fullWidth floatingLabelText="新密码" />
        <div style={buttonContainerStyle}>
          <Link to={'/' + user.role}><RaisedButton style={buttonStyle}>取消</RaisedButton></Link>
          <RaisedButton onTouchTap={this.changePassword} style={buttonStyle} secondary>确认</RaisedButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);