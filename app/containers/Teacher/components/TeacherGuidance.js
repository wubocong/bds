import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Storage from '../../../models/Storage';
import { CHANGE_TITLE } from '../../App/constants';

class TeacherGuidance extends Component{

  constructor(props){
    super(props);
  }

  componentWillMount(){
    const token = Storage.getToken();
    const { dispatch } = this.props;
    if(!token){
      dispatch(push('/'));
    } else{
      dispatch({
        type: CHANGE_TITLE,
        title: '填写指导意见'
      });
    }
  }

  render(){
    return (
      <div className="leftIn">
        guidance
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherGuidance);