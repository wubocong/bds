import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Storage from '../../../models/Storage';
import { CONFIG_APPBAR, OPEN_SNACKBAR, OPEN_LOADING_DIALOG, CLOSE_LOADING_DIALOG } from '../../App/constants';
import ReturnIconButton from '../../../components/ReturnIconButton';

class TeacherProfile extends Component {

  constructor(props) {
    super(props);
    let user = Storage.getUser();
    this.state = {
      newUser: Object.assign({}, user),
      isComfirmDialogOpen: false
    }
  }

  componentWillMount() {
    const user = Storage.getUser();
    const { dispatch } = this.props;
    dispatch({
      type: CONFIG_APPBAR,
      appbarConfig: {
        title: user.name,
        isAppbarOpen: true,
        appbarLeftElement: <ReturnIconButton href="/teacher" />,
        appbarRightElement: null
      }
    });
  }

  setName = event => {
    this.setState({
      newUser: Object.assign({}, this.state.newUser, {
        name: event.target.value
      })
    });
  }

  setGender = (event, index, value) => {
    this.setState({
      newUser: Object.assign({}, this.state.newUser, {
        gender: value
      })
    });
  }

  setPosTitle = (event, index,value) => {
    this.setState({
      newUser: Object.assign({}, this.state.newUser, {
        posTitle: value
      })
    });
  }

  setProTitle = (event, index,value) => {
    this.setState({
      newUser: Object.assign({}, this.state.newUser, {
        proTitle: value
      })
    });
  }

  setEmail = event => {
    this.setState({
      newUser: Object.assign({}, this.state.newUser, {
        email: event.target.value
      })
    });
  }

  setPhone = event => {
    this.setState({
      newUser: Object.assign({}, this.state.newUser, {
        phone: event.target.value
      })
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

  judgeChange = () => {
    const { newUser } = this.state;
    const user = Storage.getUser();
    const { dispatch } = this.props;
    let isChangeProfile = false;
    for (let key in newUser) {
      if((typeof newUser[key]).toLowerCase() === 'object'){
        continue;
      }
      if (newUser[key] !== user[key]) {
        isChangeProfile = true;
        break;
      }
    }
    if (isChangeProfile) {
      this.openComfirmDialog();
    } else {
      dispatch(push('/teacher'));
    }
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

  changeProfile = () => {
    const { dispatch } = this.props;
    this.closeComfirmDialog();
    this.openLoadingDialog();
    setTimeout(() => {
      this.closeLoadingDialog();
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '修改成功'
      });
      dispatch(push('/teacher'));
    }, 1000);
  }

  render() {
    let { newUser } = this.state;
    let { isComfirmDialogOpen } = this.state;
    return (
      <div className="leftIn" style={{
        margin: '80px auto 30px auto',
        maxWidth: 450,
        padding: '0 20px'
      }}>
        <TextField fullWidth floatingLabelText="工号" value={newUser.account} disabled />
        <TextField onChange={this.setName} floatingLabelText="姓名" value={newUser.name} style={{
          width: '50%'
        }} />
        <SelectField onChange={this.setGender} floatingLabelText="性别" value={newUser.gender} style={{
          width: '50%',
          verticalAlign: 'bottom'
        }}>
          <MenuItem value={true} primaryText="男" />
          <MenuItem value={false} primaryText="女" />
        </SelectField>
        <SelectField onChange={this.setPosTitle} floatingLabelText="职称" value={newUser.posTitle} style={{
          width: '50%',
          verticalAlign: 'bottom'
        }}>
          <MenuItem value="4" primaryText="教授" />
          <MenuItem value="3" primaryText="副教授" />
          <MenuItem value="2" primaryText="讲师" />
          <MenuItem value="1" primaryText="助教" />
          <MenuItem value="0" primaryText="无" />
        </SelectField>
        <SelectField onChange={this.setProTitle} floatingLabelText="学历" value={newUser.proTitle} style={{
          width: '50%',
          verticalAlign: 'bottom'
        }}>
          <MenuItem value="4" primaryText="博士" />
          <MenuItem value="3" primaryText="硕士" />
          <MenuItem value="2" primaryText="本科" />
          <MenuItem value="1" primaryText="专科" />
          <MenuItem value="0" primaryText="无" />
        </SelectField>
        <TextField fullWidth disabled floatingLabelText="学校" value={newUser.university} />
        <TextField fullWidth disabled floatingLabelText="学院" value={newUser.school} />
        <TextField onChange={this.setEmail} fullWidth floatingLabelText="电子邮箱" value={newUser.email} />
        <TextField onChange={this.setPhone} fullWidth floatingLabelText="联系电话" value={newUser.phone} />
        <div style={{
          marginTop: 20,
          textAlign: 'center'
        }}>
          <RaisedButton onTouchTap={this.judgeChange} primary label="保存" />
          &nbsp;&nbsp;&nbsp;
          <Link to="teacher/change-password"><RaisedButton primary label="修改密码" /></Link>
        </div>
        <Dialog
          actions={[<FlatButton onTouchTap={this.closeComfirmDialog} label="取消" />, <FlatButton secondary onTouchTap={this.changeProfile} label="确认" />]}
          modal={false}
          open={isComfirmDialogOpen}
          onRequestClose={this.closeComfirmDialog}
          >确定修改个人资料吗?</Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfile);