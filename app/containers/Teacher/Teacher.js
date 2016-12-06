import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Storage from '../../models/Storage';

class Teacher extends Component {

  // 检查是否已登录
  componentWillMount() {
    const { dispatch } = this.props;
    const token = Storage.getToken();
    const user = Storage.getUser();
    if (!token) {
      dispatch(push('/'));
    } else {
      // dispatch(push('/' + user.role));
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
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);