import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { Popover, PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import { OPEN_LOGOUT_DIALOG } from '../../App/constants';
import Storage from '../../../models/Storage';
import UpTri from '../../../images/up-tri16.png';
import DownTri from '../../../images/down-tri16.png';
import PersonIcon from '../../../images/person.png';
import LogoutIcon from '../../../images/logout.png';

const menuItemStyle = {
  fontSize: 12
};

class AdminMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: false,
      anchor: null
    };
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

  showLogoutDialog = () => {
    this.closePopover();
    const { dispatch } = this.props;
    dispatch({
      type: OPEN_LOGOUT_DIALOG
    });
  }

  toProfile = () => {
    this.closePopover();
    const { dispatch } = this.props;
    dispatch(push('/admin/profile'));
  }

  toChangePassword = () => {
    this.closePopover();
    const { dispatch } = this.props;
    dispatch(push('/admin/change-password'));
  }

  render() {
    const user = Storage.getUser();
    const { isPopoverOpen, anchor } = this.state;
    return (
      <div style={{
        marginTop: 5
      }}>
        <FlatButton onTouchTap={this.openPopover} style={{
          color: 'white'
        }}>{user.name} <img style={{
          verticalAlign: 'middle'
        }} src={isPopoverOpen ? UpTri : DownTri} /></FlatButton>
        <Popover
          open={isPopoverOpen}
          anchorEl={anchor}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.closePopover}
          animation={PopoverAnimationVertical}
          >
          <Menu>
            <MenuItem onTouchTap={this.toProfile} style={menuItemStyle} leftIcon={<img src={PersonIcon} />} primaryText="管理员信息" />
            <Divider />
            <MenuItem onTouchTap={this.showLogoutDialog} style={menuItemStyle} leftIcon={<img src={LogoutIcon} />} primaryText="退出登录" />
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminMenu);