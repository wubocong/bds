import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Storage from '../../../models/Storage';
import { CHANGE_TITLE } from '../../App/constants';
import { SYSTEM_NAME } from '../../../constants';

class TeacherOperation extends Component{

  componentWillMount(){
    const token = Storage.getToken();
    const { dispatch } = this.props;
    if(!token){
      dispatch(push('./'));
    } else{
      dispatch({
        type: CHANGE_TITLE,
        title: SYSTEM_NAME
      });
    }
  }

  render(){
    return (
      <div className="rightIn">
        teacher operation
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispathcToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispathcToProps)(TeacherOperation);