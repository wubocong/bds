import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Storage from '../../models/Storage';
import { OPEN_SNACKBAR, CLOSE_SNACKBAR, CLOSE_LOGOUT_DIALOG } from './constants';
import closeIcon from '../../images/close.png';

class App extends Component{

  closeSnackbar = () => {
    const { dispatch } = this.props;
    dispatch({
      type: CLOSE_SNACKBAR
    });
  }

  closeLogoutDialog = () => {
    const { dispatch } = this.props;
    dispatch({
      type: CLOSE_LOGOUT_DIALOG
    });
  }

  logout = () => {
    this.closeLogoutDialog();
    const { dispatch } = this.props;
    Storage.clear();
    dispatch(push('/'));
  }

  render(){
    const { isSnackbarOpen, snackbarText, isLogoutDialogOpen } = this.props;
    return (
      <div>
        {this.props.children}
        <Snackbar open={isSnackbarOpen} message={snackbarText} autoHideDuration={6000} onRequestClose={this.closeSnackbar} onActionTouchTap={this.closeSnackbar} action={<img src={closeIcon} className="icon" />} />
        <Dialog
          actions={[<FlatButton onTouchTap={this.closeLogoutDialog}>取消</FlatButton>, <FlatButton secondary onTouchTap={this.logout}>确认</FlatButton>]}
          modal={false}
          open={isLogoutDialogOpen}
          onRequestClose={this.closeLogoutDialog}
        >确定退出登录并返回登录页面?</Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isSnackbarOpen, snackbarText, isLogoutDialogOpen } = state.app;
  return {
    isSnackbarOpen,
    snackbarText,
    isLogoutDialogOpen
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);