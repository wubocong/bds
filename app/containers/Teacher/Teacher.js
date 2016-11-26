import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';

import Storage from '../../models/Storage';
import HomeIconButton from '../../components/HomeIconButton';
import ReturnIconButton from '../../components/ReturnIconButton';
import TeacherMenu from './components/TeacherMenu';

class Teacher extends Component{

  constructor(props){
    super(props);
    this.state = {
      user: Storage.getUser()
    };
  }

  // 检查是否已登录
  componentWillMount(){
    const { user } = this.state;
    const { dispatch } = this.props;
    const token = Storage.getToken();
    if(!token){
      dispatch(push('/'));
    } else{
      dispatch(push('/' + user.role));
    }
  }

  render(){
    const { title, path } = this.props;
    return (
      <div>
        <AppBar title={title} iconElementLeft={path === '/teacher' ? <HomeIconButton href="/teacher" /> : <ReturnIconButton href="/teacher" />} iconElementRight={<TeacherMenu />} />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    title: state.app.title,
    path: state.routing.locationBeforeTransitions.pathname
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);