import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { CHANGE_TITLE } from '../../App/constants';
import { SYSTEM_NAME } from '../../../constants';
import Storage from '../../../models/Storage';

class StudentInformation extends Component {

  componentWillMount() {
    const token = Storage.getToken();
    const { dispatch } = this.props;
    if (!token) {
      dispatch(push('/'));
    } else {
      dispatch({
        type: CHANGE_TITLE,
        title: SYSTEM_NAME
      });
    }
  }

  render() {
    return (
      <div className="rightIn">
        <div>答辩信息</div>
        <div>指导老师意见</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentInformation);