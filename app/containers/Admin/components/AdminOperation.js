import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton'

import Storage from '../../../models/Storage';
import { CHANGE_TITLE } from '../../App/constants';
import { SYSTEM_NAME } from '../../../constants';
import ArrowRightIcon from '../../../images/arrow-right.png';

const linkStyle = {
  textDecoration: 'none'
};
const paperStyle = {
  display: 'block',
  width: '100%',
  fontSize: '1.1rem',
  padding: 20,
  lineHeight: '1.65rem',
  margin: '20px 0',
  position: 'relative'
}
const imgStyle = {
  position: 'absolute',
  right: '20px',
  top: '7px'
};

class AdminOperation extends Component {

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
      <div className="rightIn" style={{
        maxWidth: 400,
        margin: '30px auto'
      }}>
        <Link to="/admin/manage-teacher" style={linkStyle}>
          <Paper zDepth={2} style={paperStyle}>
            管理教师信息
          <IconButton tooltip="进入" style={imgStyle}><img src={ArrowRightIcon} /></IconButton>
          </Paper>
        </Link>
        <Link to="/admin/manage-student" style={linkStyle}>
          <Paper zDepth={2} style={paperStyle}>
            管理学生信息
          <IconButton tooltip="进入" style={imgStyle}><img src={ArrowRightIcon} /></IconButton>
          </Paper>
        </Link>
        <Link to="/admin/manage-defense" style={linkStyle}>
          <Paper zDepth={2} style={paperStyle}>
            安排答辩场次
          <IconButton tooltip="进入" style={imgStyle}><img src={ArrowRightIcon} /></IconButton>
          </Paper>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminOperation);