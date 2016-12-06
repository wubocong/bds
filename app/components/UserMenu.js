import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { Popover, PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import { OPEN_LOGOUT_DIALOG } from '../containers/App/constants';
import Storage from '../models/Storage';
import TeacherIcon from '../images/teacher100.png';
import StudentIcon from '../images/student100.png';
import AdminIcon from '../images/admin100.png';
import UpTri from '../images/up-tri16.png';
import DownTri from '../images/down-tri16.png'

const menuItemStyle = {
  fontSize: '0.75rem',
  textAlign: 'right'
}

class UserMenu extends Component {
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
    const user = Storage.getUser();
    dispatch(push(`/${user.role}/profile`));
  }

  render() {
    const user = Storage.getUser();
    const { isPopoverOpen, anchor } = this.state;
    let defaultAvatar;
    if(user.role === 'admin'){
      defaultAvatar = AdminIcon;
    } else if(user.role == 'student'){
      defaultAvatar = StudentIcon;
    } else{
      defaultAvatar = TeacherIcon;
    }
    return (
      <div style={{
        margin: '10px 0'
      }}>
        <div onTouchTap={this.openPopover} style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}>
          <img src={user.avatar || defaultAvatar} style={{
            width: '30px',
            height: '30px',
            borderRadius: '3px',
            backgroundColor: 'white'
          }} />
          <img src={isPopoverOpen ? UpTri : DownTri} />
        </div>
        <Popover
          style={{
            marginTop: 10
          }}
          open={isPopoverOpen}
          anchorEl={anchor}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.closePopover}
          animation={PopoverAnimationVertical}
          >
          <Menu>
            <MenuItem onTouchTap={this.toProfile} style={menuItemStyle} primaryText={user.name} />
            <Divider />
            <MenuItem onTouchTap={this.showLogoutDialog} style={menuItemStyle} primaryText="退出登录" />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);