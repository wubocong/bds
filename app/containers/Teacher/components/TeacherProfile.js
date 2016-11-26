import React, { Component } from 'react';
import { connect} from 'react-redux';
import { push } from 'react-router-redux';

import Storage from '../../../models/Storage';
import { CHANGE_TITLE } from '../../App/constants';

class TeacherProfile extends Component{

  componentWillMount(){
    const { dispatch } = this.props;
    const token = Storage.getToken();
    if(!token){
      dispatch(push('/'));
    } else{
      dispatch({
        type: CHANGE_TITLE,
        title: '账号信息'
      });
    }
  }

  render(){
    return (
      <div className="leftIn">profile teacher</div>
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