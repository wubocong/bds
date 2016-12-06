import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import Storage from '../../../models/Storage';
import { CHANGE_TITLE } from '../../App/constants';

class ManageDefense extends Component{

  componentWillMount(){
    const token = Storage.getToken();
    const { dispatch } = this.props;
    if(!token){
      dispatch(push('/'));
    } else{
      dispatch({
        type: CHANGE_TITLE,
        title: '安排答辩场次'
      });
    }
  }

  render(){
    return (
      <div className="leftIn">
        defense
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDefense);