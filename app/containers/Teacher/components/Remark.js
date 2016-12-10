import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import Storage from '../../../models/Storage';
import { CONFIG_APPBAR, OPEN_SNACKBAR, OPEN_LOADING_DIALOG, CLOSE_LOADING_DIALOG } from '../../App/constants';
import LoadingButton from '../../../components/LoadingButton';
import { HOST } from '../../../constants';

import test_paper from '../../../test_data/teacher_remark';

class Remark extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReturnDialogOpen: false,
      isComfirmDialogOpen: false,
      paper: null
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: CONFIG_APPBAR,
      appbarConfig: {
        isAppbarOpen: true,
        title: '最终评分及评语',
        appbarLeftElement: <LoadingButton />
      }
    });
  }

  componentDidMount() {
    let { paperId } = this.props.location.query;
    let token = Storage.getToken();
    fetch(`${HOST}/papers/final/${paperId}`, {
      method: 'GET',
      headers: {
        Authorization: 'bearer ' + token
      }
    }).then(response => {
      if (response.status === 200) {
        response.json().then(json => {
          this.setState({
            paper: json
          });
        });
      } else {
        dispatch({
          type: OPEN_SNACKBAR,
          snackbarText: '错误！请刷新！'
        });
      }
    }, error => {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '网络错误！请刷新！'
      });
    });
  }

  openLoadingDialog = () => {
    const { dispatch } = this.props;
    dispatch({
      type: OPEN_LOADING_DIALOG
    });
  }

  closeLoadingDialog = () => {
    const { dispatch } = this.props;
    dispatch({
      type: CLOSE_LOADING_DIALOG
    });
  }

  setFinalScore = event => {
    this.setState({
      paper: Object.assign({}, this.state.paper, {
        finalScore: parseInt(event.target.value || 0)
      })
    });
  }

  setRemark = event => {
    this.setState({
      paper: Object.assign({}, this.state.paper, {
        remark: event.target.value
      })
    });
  }

  openReturnDialog = () => {
    this.setState({
      isReturnDialogOpen: true
    });
  }

  closeReturnDialog = () => {
    this.setState({
      isReturnDialogOpen: false
    });
  }

  openComfirmDialog = () => {
    this.setState({
      isComfirmDialogOpen: true
    });
  }

  closeComfirmDialog = () => {
    this.setState({
      isComfirmDialogOpen: false
    });
  }

  beforeUpload = () => {
    const { paper } = this.state;
    const { dispatch } = this.props;
    if (paper.finalScore < 0 || paper.finalScore > 100) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '分数应在0 ~ 100之间！'
      });
    } else if (!paper.remark) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '评语不能为空！'
      });
    } else {
      this.openComfirmDialog();
    }
  }

  upload = () => {
    this.closeComfirmDialog();
    this.openLoadingDialog();
    let { defenseId, studentName, studentAccount, paperName, guideTeacher, paperId } = this.props.location.query;
    let token = Storage.getToken();
    let { dispatch } = this.props;
    let { finalScore, remark } = this.state.paper;
    fetch(`${HOST}/papers/final/${paperId}`, {
      method: 'PUT',
      headers: {
        Authorization: 'bearer ' + token
      },
      body: JSON.stringify({
        paper: {
          finalScore,
          remark
        }
      })
    }).then(response => {
      if (response.status === 200) {
        dispatch({
          type: OPEN_SNACKBAR,
          snackbarText: '完成评分！'
        });
        dispatch(push(`/teacher/result?studentAccount=${studentAccount}&studentName=${studentName}&paperId=${paperId}&paperName=${paperName}&guideTeacher=${guideTeacher}&defenseId=${defenseId}`));
      } else {
        dispatch({
          type: OPEN_SNACKBAR,
          snackbarText: '请重试！'
        });
      }
    }, error => {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '网络错误！请重试！'
      });
    });
    this.closeLoadingDialog();
  }

  returnEvaluate = () => {
    // this.closeReturnDialog();
    // this.openLoadingDialog();
    // fetch()
    // setTimeout(() => {
    //   this.closeLoadingDialog();
    //   const { dispatch } = this.props;
    //   const { studentName, studentAccount, paperName, guideTeacher, paperId, defenseId, leaderId } = this.props.location.query;
    //   dispatch(push(`/teacher/evaluate?studentAccount=${studentAccount}&studentName=${studentName}&paperId=${paperId}&paperName=${paperName}&guideTeacher=${guideTeacher}&defenseId=${defenseId}&leaderId=${leaderId}`));
    // }, 1000);
  }

  render() {
    let { paperName, studentName, studentAccount, guideTeacher, defenseId } = this.props.location.query;
    let { paper, isReturnDialogOpen, isComfirmDialogOpen } = this.state;
    let tables = [];
    if (paper) {
      let ITEM_NAME = {
        topicScore: '论文选题',
        pointScore: '立论',
        designScore: '方案设计',
        qualityScore: '论文质量',
        resultScore: '论文结果',
        descriptionScore: '文字表述',
        innovationScore: '创新程度',
        defenseScore: '答辩情况'
      };
      let evaluates = ['不及格', '及格', '中等', '良好', '优秀'];
      let colors = ['green', 'blue', 'orange', 'pink', 'red'];
      for (let key in ITEM_NAME) {
        let table = [];
        table.push(<TableRowColumn>{ITEM_NAME[key]}</TableRowColumn>);
        for (let score of paper.scores) {

          table.push(<TableRowColumn style={{
            color: colors[score.items[key]]
          }}>{evaluates[score.items[key]]}</TableRowColumn>);
        }
        tables.push(table);
      }
      let finalTable = [<TableRowColumn>评分</TableRowColumn>];
      for (let score of paper.scores) {
        let color;
        if (score.sum >= 90) {
          color = 'green';
        } else if (score.sum >= 80) {
          color = 'blue';
        } else if (score.sum >= 70) {
          color = 'orange';
        } else if (score.sum >= 60) {
          color = 'pink';
        } else {
          color = 'red';
        }
        finalTable.push(<TableRowColumn style={{
          color: color
        }}>{score.sum}</TableRowColumn>);
      }
      tables.push(finalTable);
    }
    return (
      <div className="leftIn" style={{
        margin: '80px auto 30px auto',
        maxWidth: 450,
        padding: '0 20px'
      }}>
        {
          paper ? <div>
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
            <Table selectable={false}>
              <TableHeader displaySelectAll={false} >
                <TableRow>
                  <TableHeaderColumn>评分项</TableHeaderColumn>
                  {paper.scores.map((score, index) => {
                    return <TableHeaderColumn key={index}>{score.teacher.name}</TableHeaderColumn>;
                  })}
                </TableRow>
              </TableHeader>
              <TableBody stripedRows={true} displayRowCheckbox={false}>
                {
                  tables.map((table, index) => {
                    return (
                      <TableRow key={index}>
                        {table}
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
            <div style={{
              margin: '20px 0'
            }}>
              <TextField onChange={this.setFinalScore} fullWidth floatingLabelText="最终成绩" value={paper.finalScore} />
            </div>
            <textarea onChange={this.setRemark} value={paper.remark} style={{
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
              <RaisedButton onTouchTap={this.openReturnDialog} secondary label="重新评分" />
              &nbsp;
              <RaisedButton onTouchTap={this.beforeUpload} primary label="提交" />
            </div>
            <Dialog
              actions={[<FlatButton onTouchTap={this.closeReturnDialog} label="取消" />, <FlatButton secondary onTouchTap={this.returnEvaluate} label="确认" />]}
              modal={false}
              open={isReturnDialogOpen}
              onRequestClose={this.closeReturnDialog}
              >确定重新评分?</Dialog>
            <Dialog
              actions={[<FlatButton onTouchTap={this.closeComfirmDialog} label="取消" />, <FlatButton secondary onTouchTap={this.upload} label="确认" />]}
              modal={false}
              open={isComfirmDialogOpen}
              onRequestClose={this.closeComfirmDialog}
              >提交评分后将不能修改, 确定提交评分?</Dialog>
          </div> : <div style={{
            textAlign: 'center',
            marginTop: 150,
            fontSize: '0.9rem'
          }}>
              <CircularProgress />
              <br />
              <br />
              正在自动生成评语...
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

export default connect(mapStateToProps)(Remark);