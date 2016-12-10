import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import ReturnIconButton from '../../components/ReturnIconButton';
import HomeIconButton from '../../components/HomeIconButton';
import Storage from '../../models/Storage';

class Admin extends Component {

  render() {
    const { title, path } = this.props;
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);