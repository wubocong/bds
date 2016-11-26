import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { CHANGE_TITLE } from '../../App/constants';
import Storage from '../../../models/Storage';

const StudentProfileStyle = {
  maxWidth: 400,
  margin: '20px auto',
  padding: '10px 30px'
};

class StudentProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: Storage.getUser()
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

  render() {
    const { user } = this.state;
    return (
      <div style={StudentProfileStyle} className="leftIn">
        <TextField fullWidth floatingLabelText="学号" defaultValue={user.account || '无'} disabled />
        <TextField fullWidth floatingLabelText="姓名" defaultValue={user.name || '无'} disabled />
        <TextField fullWidth floatingLabelText="性别" defaultValue={user.gender ? '男' : '女'} disabled />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);