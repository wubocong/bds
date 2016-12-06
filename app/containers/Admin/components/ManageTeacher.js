import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import Storage from '../../../models/Storage';
import { CHANGE_TITLE } from '../../App/constants';

class ManageTeacher extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
  }

  componentWillMount() {
    const token = Storage.getToken();
    const { dispatch } = this.props;
    if (!token) {
      dispatch(push('/'));
    } else {
      dispatch({
        type: CHANGE_TITLE,
        title: '管理教师信息'
      });
    }
  }

  setKeyword = event => {
    this.setState({
      keyword: event.target.value
    });
  }

  render() {
    const { keyword } = this.state;

    return (
      <div className="leftIn" style={{
        maxWidth: 500,
        margin: '20px auto 30px auto'
      }}>
        <div style={{
          textAlign: 'center',
          margin: '20px 0'
        }}>
          <RaisedButton primary label="新增教师" />
          &nbsp;
          <RaisedButton primary label="批量增加教师" />
        </div>
        <Divider />
        <div style={{
          padding: '10px 20px'
        }}>
          <TextField onChange={this.setKeyword} floatingLabelText="搜索教师" hintText="工号或者姓名" value={keyword} style={{
            width: '80%',
            verticalAlign: 'bottom'
          }} />
          <RaisedButton primary label="搜索" style={{
            width: '20%',
            marginBottom: 8
          }} />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);