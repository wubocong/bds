import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';

import ReturnIconButton from '../../components/ReturnIconButton';
import { CONFIG_APPBAR } from '../App/constants';

const h2Style = {
  fontSize: '1.2rem', 
  margin: '20px 0 15px 0'
};
const h3Style = {
  fontSize: '1rem', 
  margin: '10px 0'
};
const pStyle = {
  fontSize: '0.9rem', 
  margin: '5px 0 5px 20px'
}

class Help extends Component {

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch({
      type: CONFIG_APPBAR,
      appbarConfig: {
        title: '帮助',
        appbarLeftElement: <ReturnIconButton href="/" />
      }
    });
  }

  render() {
    return (
      <div className="rightIn" style={{
        marginTop: 80
      }}>
        <Paper className="rightIn" zDepth={2} style={{
          margin: '0 auto 30px auto',
          maxWidth: 600,
          padding: 20
        }}>
          <h2 style={h2Style}>1. 忘记密码</h2>
          <p style={pStyle}>请联系管理员。</p>
          <p style={pStyle}>邮箱：</p>
          <p style={pStyle}>电话：</p>
        </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(Help);