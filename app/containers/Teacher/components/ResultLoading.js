import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { CONFIG_APPBAR } from '../../App/constants';
import LoadingButton from '../../../components/LoadingButton';
import LoadingIcon from '../../../images/loading48.png';
import Storage from '../../../models/Storage';

class ResultLoading extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: CONFIG_APPBAR,
      appbarConfig: {
        isAppbarOpen: true,
        title: '等待中...',
        appbarLeftElement: <LoadingButton />,
        appbarRightElement: null
      }
    });
  }

  componentDidMount() {
    const {leaderId, studentId, defenseId} = this.props.location.query;
    const user = Storage.getUser();
    const { dispatch } = this.props;
    setTimeout(() => {
      if (user._id === leaderId) {
        dispatch(push(`/teacher/remark?defenseId=${defenseId}&studentId=${studentId}`));
      } else {
        dispatch(push(`/teacher/result?studentId=${studentId}&defenseId=${defenseId}`));
      }
    }, 1000);
  }

  render() {
    return (
      <div className="leftIn" style={{
        margin: '140px auto 30px auto',
        maxWidth: 450,
        padding: '0 20px'
      }}>
        <div style={{
          textAlign: 'center',
          margin: '30px 0'
        }}>
          <img src={LoadingIcon} className="circle" />
        </div>
        <div style={{
          textAlign: 'center'
        }}>正在等待其他老师提交评分...</div>
        <div style={{
          fontSize: '0.9rem',
          lineHeight: '1.35rem',
          margin: '20px 0'
        }}>
          提示：全部老师提交评分后，组长将自动跳转到填写最终成绩及评语页面，其他老师等待组长填写完毕后跳转到最终成绩页面；如需重新评分，由组长在填写最终成绩及评语页面点击重新评分按钮.
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

export default connect(mapStateToProps)(ResultLoading);