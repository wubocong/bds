import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { CONFIG_APPBAR, OPEN_SNACKBAR, OPEN_LOADING_DIALOG, CLOSE_LOADING_DIALOG } from '../containers/App/constants';
import ReturnIconButton from './ReturnIconButton';
import Storage from '../models/Storage';

class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
      isComfirmDialogOpen: false
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const user = Storage.getUser();
    dispatch({
      type: CONFIG_APPBAR,
      appbarConfig: {
        title: '修改密码',
        isAppbarOpen: true,
        appbarLeftElement: <ReturnIconButton href={'/' + user.role + '/profile'} />,
        appbarRightElement: null
      }
    });
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

  setRepeatPassword = event => {
    this.setState({
      repeatPassword: event.target.value
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

  openComfirmDialog = () => {
    this.setState({
      isComfirmDialogOpen: true
    });
  }

  closeComfirmDialog = () => {
    this.setState({
      isComfirmDialogOpen: false
    });
  }

  beforeChange = () => {
    const { oldPassword, newPassword, repeatPassword } = this.state;
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
    } else if (!repeatPassword) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '请重复输入输入新密码！'
      });
    } else if (newPassword !== repeatPassword) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '两次密码不一致！'
      });
    } else {
      this.openComfirmDialog();
    }
  }

  changePassword = () => {
    this.closeComfirmDialog();
    this.openLoadingDialog();
    const user = Storage.getUser();
    const { dispatch } = this.props;
    setTimeout(() => {
      this.closeLoadingDialog();
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '修改成功'
      });
      dispatch(push('/' + user.role + '/profile'));
    }, 5000);
  }

  render() {
    const user = Storage.getUser();
    const { oldPassword, newPassword, repeatPassword, isComfirmDialogOpen} = this.state;
    return (
      <div className="leftIn" style={{
        margin: '80px auto 30px auto',
        maxWidth: 450,
        padding: '0 20px'
      }}>
        <TextField fullWidth disabled floatingLabelText="账号" value={user.account} />
        <TextField type="password" fullWidth floatingLabelText="原密码" value={oldPassword} onChange={this.setOldPassword} />
        <TextField type="password" fullWidth floatingLabelText="新密码" value={newPassword} onChange={this.setNewPassword} />
        <TextField type="password" fullWidth floatingLabelText="重复新密码" value={repeatPassword} onChange={this.setRepeatPassword} />
        <div style={{
          margin: '20px 0',
          textAlign: 'center'
        }}>
          <Link to={'/' + user.role + '/profile'}>
            <RaisedButton label="取消" />
          </Link>
          <RaisedButton onTouchTap={this.beforeChange} secondary label="确认" />
        </div>
        <Dialog
          actions={[<FlatButton onTouchTap={this.closeComfirmDialog} label="取消" />, <FlatButton secondary onTouchTap={this.changePassword} label="确认" />]}
          modal={false}
          open={isComfirmDialogOpen}
          onRequestClose={this.closeComfirmDialog}
          >确定修改密码?</Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {}
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);