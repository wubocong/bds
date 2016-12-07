import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import ReturnIconButton from '../../../components/ReturnIconButton';
import { CONFIG_APPBAR, OPEN_SNACKBAR, OPEN_LOADING_DIALOG, CLOSE_LOADING_DIALOG } from '../../App/constants';
import EvaluateItem from './EvaluateItem';
import Storage from '../../../models/Storage';

class Evaluate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topicScore: null,
      pointScore: null,
      designScore: null,
      qualityScore: null,
      resultScore: null,
      descriptionScore: null,
      innovationScore: null,
      defenseScore: null,
      score: null,
      isComfirmDialogOpen: false
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const { defenseId } = this.props.location.query;
    dispatch({
      type: CONFIG_APPBAR,
      appbarConfig: {
        isAppbarOpen: true,
        title: '评分',
        appbarLeftElement: <ReturnIconButton href={'/teacher/defense?defenseId=' + defenseId} />,
        appbarRightElement: null
      }
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

  calculateScore = () => {
    const { topicScore, pointScore, designScore, qualityScore, resultScore, descriptionScore, innovationScore, defenseScore } = this.state;
    if (topicScore && pointScore && designScore && qualityScore && resultScore && descriptionScore && innovationScore && defenseScore) {
      this.setState({
        score: (topicScore + pointScore + designScore + qualityScore + resultScore + descriptionScore + innovationScore + defenseScore) / 8
      });
      console.log(this.state.score);
    }
  }

  setTopicScore = event => {
    this.setState({
      topicScore: parseInt(event.target.value)
    });
    setTimeout(() => {
      this.calculateScore();
    }, 0);
  }

  setPointScore = event => {
    this.setState({
      pointScore: parseInt(event.target.value)
    });
    setTimeout(() => {
      this.calculateScore();
    }, 0);
  }

  setDesignScore = event => {
    this.setState({
      designScore: parseInt(event.target.value)
    });
    setTimeout(() => {
      this.calculateScore();
    }, 0);
  }

  setQualityScore = event => {
    this.setState({
      qualityScore: parseInt(event.target.value)
    });
    setTimeout(() => {
      this.calculateScore();
    }, 0);
  }

  setResultScore = event => {
    this.setState({
      resultScore: parseInt(event.target.value)
    });
    setTimeout(() => {
      this.calculateScore();
    }, 0);
  }

  setDescriptionScore = event => {
    this.setState({
      descriptionScore: parseInt(event.target.value)
    });
    setTimeout(() => {
      this.calculateScore();
    }, 0);
  }

  setInnovationScore = event => {
    this.setState({
      innovationScore: parseInt(event.target.value)
    });
    setTimeout(() => {
      this.calculateScore();
    }, 0);
  }

  setDefenseScore = event => {
    this.setState({
      defenseScore: parseInt(event.target.value)
    });
    setTimeout(() => {
      this.calculateScore();
    }, 0);
  }

  setScore = event => {
    this.setState({
      score: parseInt(event.target.value)
    });
  }

  showWarning = warning => {
    const {dispatch} = this.props;
    dispatch({
      type: OPEN_SNACKBAR,
      snackbarText: warning
    });
  }

  openLoadingDialog = () => {
    const { dispatch} = this.props;
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

  beforeUploadScore = event => {
    const { topicScore, pointScore, designScore, qualityScore, resultScore, descriptionScore, innovationScore, defenseScore, score } = this.state;
    if (!topicScore) {
      this.showWarning('请评价《选题情况》！');
    } else if (!pointScore) {
      this.showWarning('请评价《立论》！');
    } else if (!designScore) {
      this.showWarning('请评价《方案设计》！');
    } else if (!qualityScore) {
      this.showWarning('请评价《论文质量》！');
    } else if (!resultScore) {
      this.showWarning('请评价《论文结果》！');
    } else if (!descriptionScore) {
      this.showWarning('请评价《文字表述》！');
    } else if (!innovationScore) {
      this.showWarning('请评价《创新程度》！');
    } else if (!defenseScore) {
      this.showWarning('请评价《答辩情况》！');
    } else if (score < 0 || score > 100) {
      this.showWarning('分数应在 0 ~ 100 之间！');
    } else {
      this.openComfirmDialog();
    }
  }

  uploadScore = () => {
    this.closeComfirmDialog();
    this.openLoadingDialog();
    const { dispatch } = this.props;
    const { leaderId, paperId, studentAccount, paperName, guideTeacher, studentName, defenseId } = this.props.location.query;
    const user = Storage.getUser();
    setTimeout(() => {
      this.closeLoadingDialog();
      dispatch(push(`/teacher/result-loading?leaderId=${leaderId}&paperId=${paperId}&studentName=${studentName}&paperName=${paperName}&guideTeacher=${guideTeacher}&studentAccount=${studentAccount}&defenseId=${defenseId}`));
    }, 1000);
  }

  render() {
    const { studentName, studentAccount, guideTeacher, paperName, defenseId } = this.props.location.query;
    const { topicScore, pointScore, designScore, qualityScore, resultScore, descriptionScore, innovationScore, defenseScore, score, isComfirmDialogOpen } = this.state;
    return (
      <div className="leftIn">
        <div style={{
          marginTop: 65,
          padding: '10px 20px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '1.1rem',
            margin: '5px 0'
          }}>{paperName}</div>
          <div style={{
            fontSize: '0.9rem',
            margin: '5px 0'
          }}>
            {studentName}
            &nbsp;&nbsp;
            <span style={{
              fontSize: '0.75rem',
              color: 'gray'
            }}>{studentAccount}</span>
          </div>
          <div style={{
            fontSize: '0.9rem'
          }}>指导老师：{guideTeacher}</div>
        </div>
        <Divider />
        <EvaluateItem defaultValue={topicScore} itemName="选题情况" changeHandler={this.setTopicScore} />
        <EvaluateItem defaultValue={pointScore} itemName="立论" changeHandler={this.setPointScore} />
        <EvaluateItem defaultValue={designScore} itemName="方案设计" changeHandler={this.setDesignScore} />
        <EvaluateItem defaultValue={qualityScore} itemName="论文质量" changeHandler={this.setQualityScore} />
        <EvaluateItem defaultValue={resultScore} itemName="论文结果" changeHandler={this.setResultScore} />
        <EvaluateItem defaultValue={descriptionScore} itemName="文字表述" changeHandler={this.setDescriptionScore} />
        <EvaluateItem defaultValue={innovationScore} itemName="创新程度" changeHandler={this.setInnovationScore} />
        <EvaluateItem defaultValue={defenseScore} itemName="答辩情况" changeHandler={this.setDefenseScore} />
        <div style={{
          textAlign: 'center',
          margin: '10px auto 30px auto'
        }}>
          <TextField type="number" max="100" min="0" value={score || ''} floatingLabelText="总分" onChange={this.setScore} floatingLabelStyle={{
            color: 'black'
          }} />
          &nbsp;&nbsp;&nbsp;
          <RaisedButton onTouchTap={this.beforeUploadScore} primary label="确定" />
        </div>
        <Dialog
          actions={[<FlatButton onTouchTap={this.closeComfirmDialog} label="重新修改" />, <FlatButton secondary onTouchTap={this.uploadScore} label="确认" />]}
          modal={false}
          open={isComfirmDialogOpen}
          onRequestClose={this.closeComfirmDialog}
          >确定提交评分?</Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(Evaluate);