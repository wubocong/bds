import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import Storage from '../../../models/Storage';
import { CHANGE_TITLE, OPEN_SNACKBAR } from '../../App/constants';
import { HOST } from '../../../constants';

class AdminProfile extends Component {

  constructor(props) {
    super(props);
    const user = Storage.getUser();
    this.state = {
      user,
      isChangeDialogOpen: false,
      isComfirmDialogOpen: false,
      newPhone: user.phone,
      newEmail: user.email
    };
  }

  componentWillMount() {
    const token = Storage.getToken();
    const { dispatch } = this.props;
    if (!token) {
      dispatch(push('/'));
    } else {
      dispatch({
        type: CHANGE_TITLE,
        title: '账号信息'
      });
    }
  }

  changeContact = () => {
    const token = Storage.getToken();
    const { dispatch } = this.props;
    const { newPhone, newEmail, user } = this.state;
    fetch(`${HOST}/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${token}`
      },
      body: JSON.stringify({
        user: {
          phone: newPhone,
          email: newEmail
        }
      })
    }).then(response => {

      // 更新token时间戳
      Storage.updateTokenTime();
      if (response.status === 200) {
        this.setState({
          isChangeDialogOpen: false,
          isComfirmDialogOpen: false
        });
        dispatch({
          type: OPEN_SNACKBAR,
          snackbarText: '修改成功！'
        });
        const newUser = Object.assign({}, user, {
          phone: newPhone,
          email: newEmail
        });
        Storage.setUser(newUser);
        this.setState({
          user: newUser
        });
      } else {
        this.setState({
          isChangeDialogOpen: false,
          isComfirmDialogOpen: false
        });
        dispatch({
          type: OPEN_SNACKBAR,
          snackbarText: '修改失败！'
        });
      }
    }, error => {
      this.setState({
        isChangeDialogOpen: false,
        isComfirmDialogOpen: false
      });
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '网络错误！'
      });
    });
  }

  setNewEmail = event => {
    this.setState({
      newEmail: event.target.value
    });
  }

  setNewPhone = event => {
    this.setState({
      newPhone: event.target.value
    });
  }

  openChangeDialog = () => {
    this.setState({
      isChangeDialogOpen: true
    });
  }

  closeChangeDialog = () => {
    this.setState({
      isChangeDialogOpen: false
    });
  }

  openComfirmDialog = () => {
    const { user, newPhone, newEmail } = this.state;
    const { dispatch } = this.props;
    if (!newPhone) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '请输入新的电话号码！'
      });
    } else if (!newEmail) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '请输入新的电子邮箱！'
      });
    } else if (user.phone === newPhone && user.email === newEmail) {
      this.closeChangeDialog();
    } else if (!/[0-9]{7,}/.test(newPhone)) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '电话号码格式不正确！'
      });
    } else if (!/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(newEmail)) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '电子邮箱格式不正确！'
      });
    } else {
      this.setState({
        isChangeDialogOpen: false,
        isComfirmDialogOpen: true
      });
    }
  }

  closeComfirmDialog = () => {
    this.setState({
      isChangeDialogOpen: true,
      isComfirmDialogOpen: false
    });
  }

  render() {
    const { user, isChangeDialogOpen, isComfirmDialogOpen, newPhone, newEmail } = this.state;
    return (
      <div style={{
        maxWidth: 400,
        margin: '10px auto 30px auto',
        padding: '10px 30px'
      }} className="leftIn">
        <TextField fullWidth floatingLabelText="账号" value={user.account} disabled />
        <TextField fullWidth floatingLabelText="学校" value={user.university || '未录入'} disabled />
        <TextField fullWidth floatingLabelText="学院或系" value={user.school || '未录入'} disabled />
        <TextField fullWidth floatingLabelText="电话" value={user.phone || '未设置'} disabled />
        <TextField fullWidth floatingLabelText="邮箱" value={user.email || '未设置'} disabled />
        <div style={{
          textAlign: 'center',
          margin: '20px 0 0 20px'
        }}>
          <Link to="/admin/change-password"><RaisedButton primary label="修改密码" /></Link>
          &nbsp;
          <RaisedButton primary label="修改联系方式" onTouchTap={this.openChangeDialog} />
        </div>
        <Dialog
          title="修改联系方式"
          actions={[<FlatButton onTouchTap={this.closeChangeDialog} label="取消" />, <FlatButton secondary label="确认" onTouchTap={this.openComfirmDialog} />]}
          open={isChangeDialogOpen}
          onRequestClose={this.closeChangeDialog}
          >
          <TextField onChange={this.setNewPhone} fullWidth floatingLabelText="电话" value={newPhone || ''} />
          <TextField onChange={this.setNewEmail} fullWidth floatingLabelText="邮箱" value={newEmail || ''} />
        </Dialog>
        <Dialog
          actions={[<FlatButton keyboardFocused onTouchTap={this.closeComfirmDialog} label="取消" />, <FlatButton secondary onTouchTap={this.changeContact} label="确认" />]}
          open={isComfirmDialogOpen}
          onRequestClose={this.closeComfirmDialog}
          >确定修改联系方式?</Dialog>
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);