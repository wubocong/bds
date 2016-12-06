import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { CONFIG_APPBAR } from '../../App/constants';
import ReturnIconButton from '../../../components/ReturnIconButton';

class Result extends Component{

  componentWillMount(){
    const { dispatch} = this.props;
    const { defenseId } = this.props.location.query;
    dispatch({
      type: CONFIG_APPBAR,
      appbarConfig: {
        title: '最终成绩',
        isAppbarOpen: true,
        appbarLeftElement: <ReturnIconButton href={'/teacher/defense?defenseId=' + defenseId } />,
        appbarRightElement: null
      }
    });
  }

  render(){
    return (
      <div className="leftIn" style={{
        margin: '80px auto 30px auto',
        maxWidth: 450,
        padding: '0 20px'
      }}>
        result
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

export default connect(mapStateToProps)(Result);