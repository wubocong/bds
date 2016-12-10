import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import Storage from '../../../models/Storage';
import { CONFIG_APPBAR } from '../../App/constants';
import { SYSTEM_NAME } from '../../../constants';
import ArrowRightIcon from '../../../images/arrow-right.png';
import WriteIcon from '../../../images/write.png';
import UserMenu from '../../../components/UserMenu';
import HomeIconButton from '../../../components/HomeIconButton';

import test_user from '../../../test_data/teacher';

class TeacherOperation extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: CONFIG_APPBAR,
      appbarConfig: {
        isAppbarOpen: true,
        title: SYSTEM_NAME,
        appbarRightElement: <UserMenu />,
        appbarLeftElement: <HomeIconButton href="/teacher" />
      }
    });
  }

  render() {

    let user = Storage.getUser();
    // let user = test_user;

    return (
      <div className="rightIn" style={{
        margin: '80px auto 30px auto',
        maxWidth: 500
      }}>
        {
          user.students && user.students.length ? <Link to="/teacher/guidance-list" style={{
            textDecoration: 'none'
          }}>
            <Paper zDepth={3} style={{
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}>
              <img src={WriteIcon} />
              &nbsp;
            <div>填写指导意见</div>
              <img src={ArrowRightIcon} style={{
                position: 'absolute',
                right: 20,
                top: 20
              }} />
            </Paper>
          </Link> : <Paper zDepth={2} style={{
            padding: 20,
            fontSize: '0.9rem',
            fontFamily: '"PingFang SC", "Lantinghei SC", "Microsoft Yahei", "Hiragino Sans GB", "Microsoft Sans Serif", "WenQuanYi Micro Hei"'
          }}>
              本学年您并未指导学生.
          </Paper>
        }
        <Paper zDepth={3} style={{
          margin: '20px 0',
          padding: 20
        }}>
          <div style={{
            fontSize: '1.3rem',
            marginBottom: 20
          }}>答辩安排</div>
          {
            user.defenses.length ? <div>
              {
                user.defenses.map((defense, key) => {
                  const time = new Date(defense.time);
                  const year = time.getFullYear();
                  const month = time.getMonth() + 1;
                  const date = time.getDate();
                  const hour = time.getHours();
                  const minute = time.getMinutes();
                  return (
                    <Paper key={key} zDepth={2} style={{
                      padding: 20,
                      margin: '15px 0',
                      position: 'relative'
                    }}>
                      <div style={{
                        fontSize: '1.1rem',
                        marginBottom: 10
                      }}>
                        {defense.name}
                        &nbsp;&nbsp;&nbsp;
                        { (time - new Date < 1000 * 60 * 60 && defense.status === 1) ? <Link to={'/teacher/defense?defenseId=' + defense._id}><RaisedButton primary label="进入答辩" /></Link> : (defense.status === 1 ? <RaisedButton disabled label="答辩未开始" /> : <Link to={'/teacher/defense?defenseId=' + defense._id}><RaisedButton secondary label="查看结果" /></Link>)}
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        lineHeight: '1.35rem'
                      }}>
                        时间：{year}年{month}月{date}日{hour}时{minute}分
                          <br />
                        地点：{defense.address}
                        <br />
                        答辩老师：{
                          defense.teachers.map(teacher => {
                            if (teacher._id === defense.leaderId) {
                              return teacher.name + '(组长) ';
                            } else {
                              return teacher.name + ' ';
                            }
                          })
                        }
                        <br />
                        答辩人数：{defense.studentIds.length}人
                        </div>
                    </Paper>
                  );
                })
              }
            </div> : <div style={{
              fontSize: '0.9rem'
            }}>暂无答辩安排.</div>
          }
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispathcToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispathcToProps)(TeacherOperation);