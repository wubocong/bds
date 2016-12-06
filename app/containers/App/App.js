import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';

import Storage from '../../models/Storage';
import { OPEN_SNACKBAR, CLOSE_SNACKBAR, CLOSE_LOGOUT_DIALOG } from './constants';
import closeIcon from '../../images/close.png';

class App extends Component {

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

  render() {
    const { isSnackbarOpen, snackbarText, isLogoutDialogOpen, isAppbarOpen, appbarLeftElement, appbarRightElement, title, isLoadingDialogOpen } = this.props;
    return (
      <div>
        {
          isAppbarOpen ? <AppBar title={title} iconElementLeft={appbarLeftElement} iconElementRight={appbarRightElement} style={{
            position: 'fixed',
            top: 0
          }} /> : null
        }
        {this.props.children}
        <Snackbar open={isSnackbarOpen} message={snackbarText} autoHideDuration={6000} onRequestClose={this.closeSnackbar} onActionTouchTap={this.closeSnackbar} action={<img src={closeIcon} className="icon" />} />
        <Dialog
          actions={[<FlatButton onTouchTap={this.closeLogoutDialog} label="取消" />, <FlatButton keyboardFocused secondary onTouchTap={this.logout} label="确认" />]}
          modal={false}
          open={isLogoutDialogOpen}
          onRequestClose={this.closeLogoutDialog}
          >确定退出登录并返回登录页面?</Dialog>
        <Dialog open={isLoadingDialogOpen}><CircularProgress style={{
          display: 'block',
          margin: '0 auto'
        }} /></Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isSnackbarOpen, snackbarText, isLogoutDialogOpen, isAppbarOpen, appbarLeftElement, appbarRightElement, title, isLoadingDialogOpen } = state.app;
  return {
    isSnackbarOpen,
    snackbarText,
    isLogoutDialogOpen,
    isAppbarOpen,
    appbarLeftElement,
    appbarRightElement,
    title,
    isLoadingDialogOpen
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);