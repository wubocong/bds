import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

import { CONFIG_APPBAR, OPEN_SNACKBAR } from '../../App/constants';
import ReturnIconButton from '../../../components/ReturnIconButton';
import { HOST } from '../../../constants';
import Storage from '../../../models/Storage';

import test_grade from '../../../test_data/teacher_result';

class Result extends Component {

  constructor(props) {
    super(props);
    this.state = {
      grade: null
    };
  }

  componentWillMount() {
    const { dispatch} = this.props;
    const { defenseId } = this.props.location.query;
    dispatch({
      type: CONFIG_APPBAR,
      appbarConfig: {
        title: '最终成绩',
        isAppbarOpen: true,
        appbarLeftElement: <ReturnIconButton href={'/teacher/defense?defenseId=' + defenseId} />,
        appbarRightElement: null
      }
    });
  }

  componentDidMount() {
    const { paperId, defenseId } = this.props.location.query;
    const { dispatch } = this.props;
    const token = Storage.getToken();
    fetch(`${HOST}/papers/final/${paperId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + token
      }
    }).then(response => {
      if (response.status === 200) {
        response.json().then(json => {
          this.setState({
            grade: json
          });
        });
      } else {
        dispatch({
          type: OPEN_SNACKBAR,
          snackbarText: '不存在！'
        });
        dispatch('/teacher/defense?defenseId=' + defenseId);
      }
    }, error => {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '网络错误！'
      });
      dispatch('/teacher/defense?defenseId=' + defenseId);
    });
  }

  render() {
    let { grade } = this.state;
    let { paperName, studentName, studentAccount, guideTeacher, defenseId } = this.props.location.query;
    return (
      <div className="leftIn" style={{
        margin: '80px auto 30px auto',
        maxWidth: 450,
        padding: '0 20px'
      }}>
        {
          grade ? <div>
            <div style={{
              fontSize: '1.3rem',
              textAlign: 'center',
              lineHeight: '1.95rem'
            }}>
              {studentName}
              &nbsp;&nbsp;&nbsp;
              <span style={{
                fontSize: '0.9rem',
                color: 'gray'
              }}>{studentAccount}</span>
            </div>
            <div style={{
              fontSize: '0.9rem',
              lineHeight: '1.65rem',
              textAlign: 'center'
            }}>
              {paperName}
              <br />
              指导老师：{guideTeacher}
            </div>
            <div style={{
              textAlign: 'center',
              margin: '30px 0'
            }}>
              <RaisedButton primary label={grade.finalScore} />
            </div>
            <textarea disabled value={grade.remark} style={{
              width: '100%',
              padding: 10,
              borderRadius: 3,
              outline: 'none',
              resize: 'none',
              height: '150px',
              fontSize: '0.9rem',
              lineHeight: '1.35rem'
            }}></textarea>
            <div style={{
              textAlign: 'center',
              marginTop: 30
            }}>
              <Link to={`/teacher/defense?defenseId=${defenseId}`}><RaisedButton label="返回答辩列表" /></Link>
            </div>
          </div> : <div style={{
            textAlign: 'center',
            marginTop: 150,
            fontSize: '0.9rem'
          }}>
              <CircularProgress />
              <br />
              <br />
              正在获取成绩...
          </div>
        }
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

export default connect(mapStateToProps)(Result);