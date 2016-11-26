import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FlatButton from 'material-ui/FlatButton';
import { Popover, PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import PersonIcon from '../../../images/person.png';
import KeyIcon from '../../../images/key.png';
import LogoutIcon from '../../../images/logout.png';
import DownTri from '../../../images/down-tri.png';
import UpTri from '../../../images/up-tri.png';
import { OPEN_LOGOUT_DIALOG, CHANGE_TITLE } from '../../App/constants';

const menuItemStyle = {
  fontSize: 12
};
const studentMenuStyle = {
  marginTop: '5px'
};

class StudentMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: false,
      anchor: null
    };
  }

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch({
      type: CHANGE_TITLE,
      title: '账号信息'
    });
  }

  togglePopover = event => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
      anchor: event.currentTarget
    });
  }

  openPopover = event => {
    this.setState({
      isPopoverOpen: true,
      anchor: event.currentTarget
    });
  }

  closePopover = () => {
    this.setState({
      isPopoverOpen: false
    });
  }

  openLogoutDialog = () => {
    this.closePopover();
    const { dispatch } = this.props;
    dispatch({
      type: OPEN_LOGOUT_DIALOG
    });
  }

  toProfile = () => {
    this.closePopover();
    const { dispatch } = this.props;
    dispatch(push('/student/profile'));
  }

  toChangePassword = () => {
    this.closePopover();
    const { dispatch } = this.props;
    dispatch(push('/student/change-password'));
  }

  render() {
    const { username } = this.props;
    const { isPopoverOpen, anchor } = this.state;
    return (
      <div style={studentMenuStyle}>
        <FlatButton onTouchTap={this.togglePopover} style={{
          color: 'white'
        }}>{username} <img src={ isPopoverOpen ? UpTri : DownTri } style={{
          verticalAlign: 'middle'
        }} /></FlatButton>
        <Popover
          open={isPopoverOpen}
          anchorEl={anchor}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.closePopover}
          animation={PopoverAnimationVertical}
          >
          <Menu>
            <MenuItem onTouchTap={this.toProfile} primaryText="账号信息" leftIcon={<img src={PersonIcon} />} style={menuItemStyle} />
            <MenuItem onTouchTap={this.toChangePassword} primaryText="修改密码" leftIcon={<img src={KeyIcon} />} style={menuItemStyle} />
            <Divider />
            <MenuItem onTouchTap={this.openLogoutDialog} primaryText="退出登录" leftIcon={<img src={LogoutIcon} />} style={menuItemStyle} />
          </Menu>
        </Popover>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentMenu);
