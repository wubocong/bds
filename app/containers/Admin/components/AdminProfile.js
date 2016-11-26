import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push} from 'react-router-redux';

import Storage from '../../../models/Storage';
import { CHANGE_TITLE } from '../../App/constants';

class AdminProfile extends Component{

  componentWillMount(){
    const token = Storage.getToken();
    const { dispatch } = this.props;
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
      <div className="leftIn" style={{
        maxWidth: 400,
        margin: '50px auto 20px auto',
        padding: '0 30px'
      }}>
        profile
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