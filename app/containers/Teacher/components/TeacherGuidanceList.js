import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';

import Storage from '../../../models/Storage';
import { CONFIG_APPBAR } from '../../App/constants';
import ReturnIconButton from '../../../components/ReturnIconButton';
import RightArrowIcon from '../../../images/arrow-right.png';

class TeacherGuidance extends Component {

  constructor(props) {
    super(props);
    let user = Storage.getUser();
    let studentList = [];
    if (user.students && user.students.length) {
      for (let student of user.students) {
        for (let paper of user.papers) {
          if (paper.studentId === student._id) {
            student.paper = paper;
          }
        }
        studentList.push(student);
      }
    }
    this.state = {
      studentList
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: CONFIG_APPBAR,
      appbarConfig: {
        title: '填写指导意见',
        isAppbarOpen: true,
        appbarLeftElement: <ReturnIconButton href="/teacher" />,
        appbarRightElement: null
      }
    });
  }

  render() {
    let { studentList } = this.state;
    if (!studentList.length) {
      return (
        <div className="leftIn" style={{
          margin: '130px auto 30px auto',
          maxWidth: 450,
          textAlign: 'center',
          fontSize: '0.9rem'
        }
        }>
          您本学年并为指导学生.
      </div >
      );
    } else {
      return (
        <div className="leftIn" style={{
          margin: '90px auto 30px auto',
          maxWidth: 450
        }
        }>
          <div style={{
            padding: '0 20px'
          }}>
            {studentList.map((student, index) => {
              return (
                <Link key={index} to={'/teacher/guidance?student=' + JSON.stringify(student)} style={{
                  textDecoration: 'none'
                }}>
                  <Paper zDepth={2} style={{
                    cursor: 'pointer',
                    padding: '10px 20px',
                    margin: '20px 0',
                    position: 'relative'
                  }}>
                    <div style={{
                      fontSize: '1rem',
                      margin: '5px 0'
                    }}>
                      {student.name}
                      &nbsp;&nbsp;&nbsp;
                    <span style={{
                        fontSize: '0.75rem',
                        color: 'gray'
                      }}>{student.account}</span>
                    </div>
                    <div style={{
                      margin: '5px 0'
                    }}>{student.paper.name}</div>
                    <div style={{
                      fontSize: '0.75rem',
                      margin: '5px 0'
                    }}>已指导 <span style={{
                      color: 'blue'
                    }}>{student.paper.comments.length}</span> 次</div>
                    <img src={RightArrowIcon} style={{
                      position: 'absolute',
                      right: 20,
                      top: 40
                    }} />
                  </Paper>
                </Link>
              );
            })}
          </div>
        </div >
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherGuidance);