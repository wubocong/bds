import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import HomeIconButton from '../../components/HomeIconButton';
import ReturnIconButton from '../../components/ReturnIconButton';
import StudentMenu from './components/StudentMenu';
import { HOST, SYSTEM_NAME } from '../../constants';
import Storage from '../../models/Storage';

class Student extends Component {

  constructor(props) {

    super(props);
    this.state = {
      token: Storage.getToken(),
      user: Storage.getUser()
    };
  }

  // 未登录不能进入此页
  componentWillMount() {
    const token = Storage.getToken();
    const { user} = this.state;
    const { dispatch } = this.props;
    if (!token) {
      dispatch(push('/'));
    } else {
      dispatch(push('/' + user.role));
    }
  }

  render() {

    const { token, user } = this.state;
    const { title, path } = this.props;
    if (token) {
      return (
        <div className="student-page">
          <AppBar title={title} iconElementLeft={path === '/student' ? <HomeIconButton href="/student" /> : <ReturnIconButton href="/student" />} iconElementRight={<StudentMenu username={user.name} />} />
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div>跳转中...</div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    title: state.app.title,
    path: state.routing.locationBeforeTransitions.pathname
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);