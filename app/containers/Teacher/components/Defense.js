import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Storage from '../../../models/Storage';
import { OPEN_SNACKBAR, CONFIG_APPBAR } from '../../App/constants';
import LoadingIcon from '../../../images/loading48.png';
import { HOST } from '../../../constants';
import TeacherIcon from '../../../images/teacher100.png';
import StudentIcon from '../../../images/student100.png';
import ArrowRight from '../../../images/arrow-right.png';

import test_defense from '../../../test_data/teacher_defense';

class Defense extends Component {

  constructor(props) {
    super(props);
    this.state = {
      defense: null,
      isQuitDialogOpen: false
    };
  }

  componentWillMount() {
    const token = Storage.getToken();
    const { dispatch } = this.props;
    dispatch({
      type: CONFIG_APPBAR,
      appbarConfig: {
        isAppbarOpen: false
      }
    });
  }

  componentDidMount() {
    const defenseId = this.props.location.query.defenseId;
    const token = Storage.getToken();
    const { dispatch } = this.props;
    fetch(`${HOST}/defenses/detail/${defenseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${token}`
      }
    }).then(response => {
      if (response.status === 200) {
        response.json().then(json => {
          this.setState({
            defense: json.defense
          });
        });
      } else {
        dispatch({
          type: OPEN_SNACKBAR,
          snackbarText: '该场答辩不存在！'
        });
        dispatch(push('/teacher'));
      }
    }, error => {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '网络错误！'
      });
      dispatch(push('/teacher'));
    });
  }

  quit = () => {
    const { dispatch } = this.props;
    dispatch(push('/teacher'));
  }

  openQuitDialog = () => {
    this.setState({
      isQuitDialogOpen: true
    });
  }

  closeQuitDialog = () => {
    this.setState({
      isQuitDialogOpen: false
    });
  }

  render() {
    const user = Storage.getUser();
    const { defense, isQuitDialogOpen } = this.state;
    const { defenseId } = this.props.location.query;
    if (!defense) {
      return (
        <div className="fadeIn" style={{
          marginTop: 150,
          textAlign: 'center'
        }}>
          <img className="circle" src={LoadingIcon} />
          <div style={{
            fontSize: '0.9rem',
            marginTop: 20
          }}>正在加载学生列表...</div>
        </div>
      );
    } else {
      return (
        <div className="fadeIn">
          <Dialog
            actions={[<FlatButton onTouchTap={this.closeQuitDialog} label="取消" />, <FlatButton secondary onTouchTap={this.quit} label="确认" />]}
            open={isQuitDialogOpen}
            onRequestClose={this.closeQuitDialog}
            >确定退出答辩?<br /><br /><span style={{
              fontSize: '0.9rem'
            }}>提示：在答辩时间结束之前仍可进入该场答辩</span></Dialog>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 2,
            backgroundColor: 'rgb(0, 188, 212)',
            padding: 10,
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{
              fontSize: '1.3rem',
              margin: '10px 0'
            }}>答辩场次：{defense.name}</div>
            <div style={{
              fontSize: '0.9rem',
              margin: '5px 0'
            }}>
              答辩老师：
              {
                defense.teachers.map(teacher => {
                  if (teacher._id === defense.leaderId) {
                    return teacher.name + '(组长) ';
                  }
                })
              }
              {
                defense.teachers.map(teacher => {
                  if (teacher._id !== defense.leaderId) {
                    return teacher.name + ' ';
                  }
                })
              }
            </div>
            <div style={{
              fontSize: '0.9rem',
              margin: '5px 0'
            }}>
              已答辩 / 总人数：{defense.finished}/ {defense.students.length}
              &nbsp;&nbsp;&nbsp;
              {defense.status === 1 ? <RaisedButton secondary label="退出答辩" onTouchTap={this.openQuitDialog} /> : <Link to="/teacher"><RaisedButton label="返回" /></Link>}
            </div>
          </div>
          <div style={{
            margin: '150px 0 30px 0'
          }}>
            {
              defense.students.map((student, key) => {
                // 已答辩
                if (student.paper.finalScore) {
                  return (
                    <Link key={key} to={`/teacher/result?&paperName=${student.paper.name}&paperId=${student.paper._id}&studentName=${student.name}&studentAccount=${student.account}&defenseId=${defense._id}&guideTeacher=${student.teacher.name}`} style={{
                      textDecoration: 'none'
                    }}>
                      <Paper zDepth={2} style={{
                        padding: '5px 10px',
                        margin: '10px auto',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        maxWidth: 450
                      }}>
                        <img src={student.avatar || StudentIcon} style={{
                          display: 'inline-block',
                          height: 60,
                          width: 60,
                          borderRadius: '50%',
                          marginRight: 10
                        }} />
                        <div style={{
                          fontSize: '1.3rem',
                          display: 'inline-block',
                          padding: 10,
                          lineHeight: '1.45rem',
                          width: 'calc(100% - 140px)'
                        }}>
                          {student.name}
                          <span style={{
                            fontSize: '0.9rem',
                            marginLeft: 20
                          }}>{student.account}</span>
                          <div style={{
                            fontSize: '1.1rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>{student.paper.name}</div>
                        </div>
                        <div src={ArrowRight} style={{
                          display: 'inline-block',
                          padding: 10,
                          width: 50,
                          fontSize: '0.9rem',
                          backgroundColor: 'rgb(0, 188, 212)',
                          color: 'white',
                          borderRadius: '3px',
                          marginRight: 10,
                          textAlign: 'center'
                        }}>{student.paper.finalScore}</div>
                      </Paper>
                    </Link>
                  );
                }

                // 未答辩
                else {
                  if (defense.status === 1) {
                    return (
                      <Link key={key} to={`/teacher/evaluate?paperId=${student.paper._id}&studentName=${student.name}&studentAccount=${student.account}&paperName=${student.paper.name}&guideTeacher=${student.teacher.name + ' ' + student.teacher.posTitle}&leaderId=${defense.leaderId}&defenseId=${defense._id}`} style={{
                        textDecoration: 'none'
                      }}>
                        <Paper zDepth={2} style={{
                          padding: '5px 10px',
                          margin: '10px auto',
                          display: 'flex',
                          alignItems: 'center',
                          position: 'relative',
                          maxWidth: 450
                        }}>
                          <img src={student.avatar || StudentIcon} style={{
                            display: 'inline-block',
                            height: 60,
                            width: 60,
                            borderRadius: '50%',
                            marginRight: 10
                          }} />
                          <div style={{
                            fontSize: '1.3rem',
                            display: 'inline-block',
                            padding: 10,
                            lineHeight: '1.45rem',
                            width: 'calc(100% - 130px)'
                          }}>
                            {student.name}
                            <span style={{
                              fontSize: '0.9rem',
                              marginLeft: 20
                            }}>{student.account}</span>
                            <div style={{
                              fontSize: '1.1rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>{student.paper.name}</div>
                          </div>
                          <img src={ArrowRight} style={{
                            paddingRight: 20,
                            width: 50
                          }} />
                        </Paper>
                      </Link>
                    );
                  } else {
                    return (
                      <Paper zDepth={2} style={{
                        padding: '5px 10px',
                        margin: '10px auto',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        maxWidth: 450,
                        cursor: 'not-allowed'
                      }}>
                        <img src={student.avatar || StudentIcon} style={{
                          display: 'inline-block',
                          height: 60,
                          width: 60,
                          borderRadius: '50%',
                          marginRight: 10
                        }} />
                        <div style={{
                          fontSize: '1.3rem',
                          display: 'inline-block',
                          padding: 10,
                          lineHeight: '1.45rem',
                          width: 'calc(100% - 140px)'
                        }}>
                          {student.name}
                          <span style={{
                            fontSize: '0.9rem',
                            marginLeft: 20
                          }}>{student.account}</span>
                          <div style={{
                            fontSize: '1.1rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>{student.paper.name}</div>
                        </div>
                        <div src={ArrowRight} style={{
                          display: 'inline-block',
                          padding: 10,
                          width: 50,
                          fontSize: '0.9rem',
                          backgroundColor: 'red',
                          color: 'white',
                          borderRadius: '3px',
                          marginRight: 10,
                          textAlign: 'center'
                        }}>缺席</div>
                      </Paper>
                    );
                  }
                }
              })
            }
          </div>
        </div>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Defense);