import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class Remark extends Component{
  render(){
    return (
      <div className="leftIn" style={{
        margin: '80px auto 30px auto',
        maxWidth: 450,
        padding: '0 20px'
      }}>
        remark
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

export default connect(mapStateToProps)(Remark);