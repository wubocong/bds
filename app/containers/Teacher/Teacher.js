import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Storage from '../../models/Storage';
import { OPEN_CHANGE_PASSWORD_DIALOG } from '../App/constants';

class Teacher extends Component {

  // 检查是否已登录
  componentWillMount() {
    const { dispatch, password } = this.props;
    const token = Storage.getToken();
    const user = Storage.getUser();
    if (!token) {
      dispatch(push('/'));
    } else {
      // dispatch(push('/' + user.role));
      if(password === user.account){
        dispatch({
          type: OPEN_CHANGE_PASSWORD_DIALOG
        });
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    password: state.login.password
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);