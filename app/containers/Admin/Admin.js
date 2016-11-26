import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import AppBar from 'material-ui/AppBar';

import ReturnIconButton from '../../components/ReturnIconButton';
import HomeIconButton from '../../components/HomeIconButton';
import Storage from '../../models/Storage';
import AdminMenu from './components/AdminMenu';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: Storage.getUser()
    };
  }

  // 是否已登录
  componentWillMount() {
    const token = Storage.getToken();
    const { user } = this.state;
    const { dispatch, path } = this.props;
    if (!token) {
      dispatch(push('/'));
    } else {
      dispatch(push('/' + user.role));
    }
  }

  render() {
    const { title, path } = this.props;
    return (
      <div>
        <AppBar title={title} iconElementLeft={path === '/admin' ? <HomeIconButton href="/admin" /> : <ReturnIconButton href="/admin" />} iconElementRight={<AdminMenu />} />
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);