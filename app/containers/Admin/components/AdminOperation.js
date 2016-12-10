import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';

import UserMenu from '../../../components/UserMenu';
import HomeIconButton from '../../../components/HomeIconButton';
import { CONFIG_APPBAR } from '../../App/constants';
import { SYSTEM_NAME } from '../../../constants';
import WriteIcon from '../../../images/write.png';
import ArrowRightIcon from '../../../images/arrow-right.png';

class AdminOperation extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: CONFIG_APPBAR,
      appbarConfig: {
        title: SYSTEM_NAME,
        isAppbarOpen: true,
        appbarLeftElement: <HomeIconButton href="/admin" />,
        appbarRightElement: <UserMenu />
      }
    });
  }

  render() {
    return (
      <div className="rightIn" style={{
        margin: '90px auto 30px auto',
        maxWidth: 450
      }}>
        <Link to="/admin/manage-defense" style={{
          textDecoration: 'none'
        }}>
          <Paper zDepth={3} style={{
            padding: 20,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            margin: '20px 0'
          }}>
            <img src={WriteIcon} />
            &nbsp;
            <div>管理答辩场次</div>
            <img src={ArrowRightIcon} style={{
              position: 'absolute',
              right: 20,
              top: 20
            }} />
          </Paper>
        </Link>
        <Link to="/admin/manage-teacher" style={{
          textDecoration: 'none'
        }}>
          <Paper zDepth={3} style={{
            padding: 20,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            margin: '20px 0'
          }}>
            <img src={WriteIcon} />
            &nbsp;
            <div>管理教师信息</div>
            <img src={ArrowRightIcon} style={{
              position: 'absolute',
              right: 20,
              top: 20
            }} />
          </Paper>
        </Link>
        <Link to="/admin/manage-student" style={{
          textDecoration: 'none'
        }}>
          <Paper zDepth={3} style={{
            padding: 20,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            margin: '20px 0'
          }}>
            <img src={WriteIcon} />
            &nbsp;
            <div>管理学生信息</div>
            <img src={ArrowRightIcon} style={{
              position: 'absolute',
              right: 20,
              top: 20
            }} />
          </Paper>
        </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminOperation);