import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ReactUploadFile from 'react-upload-file';

import LoadingIcon from '../../../images/loading48.png';
import Storage from '../../../models/Storage';
import { CHANGE_TITLE, OPEN_SNACKBAR } from '../../App/constants';
import { HOST } from '../../../constants';

class StudentUpload extends Component {

  state = {
    isComfirmDialogOpen: false,
    isLoadingDialogOpen: false
  };

  // 判断是否已登录
  componentWillMount() {
    const token = Storage.getToken();
    const { dispatch } = this.props;
    if (!token) {
      dispatch(push('/'));
    } else {
      dispatch({
        type: CHANGE_TITLE,
        title: '上传论文'
      });
    }
  }

  setFilename = event => {
    this.setState({
      filename: event.target.value,
      file: event.target.files[0]
    });
  }

  checkFile = (files) => {
    if (!files[0]) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '请选择论文文件！'
      });
      return false
    }
    console.log(files[0].type)
    
  }

  openComfirmDialog = () => {
    this.setState({
      isComfirmDialogOpen: true
    });
    return false;
  }

  closeComfirmDialog = () => {
    this.setState({
      isComfirmDialogOpen: false
    });
  }

  openLoadingDialog = () => {
    this.setState({
      isLoadingDialogOpen: true
    });
  }

  closeLoadingDialog = () => {
    this.setState({
      isLoadingDialogOpen: false
    });
  }

  uploadStart = () => {
    this.reactUploadFile.manuallyUploadFile()
    this.closeComfirmDialog();
    this.openLoadingDialog();
  }
  uploadSuccess = (resp) => {
    console.log(resp)
    const { dispatch } = this.props;

    this.closeLoadingDialog();
    dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '上传成功！'
    });
  }

  render() {
    const { isComfirmDialogOpen, isLoadingDialogOpen, filename } = this.state;
    const token = Storage.getToken();
    const options = {
      baseUrl: `${HOST}/papers/file/584140c1a0179e0c364d6396`,
      fileFieldName: 'paper',
      requestHeaders: { authorization: `bearer ${token}` },
      didChoose: this.checkFile,
      beforeUpload: this.openComfirmDialog,
      uploadSuccess: this.uploadSuccess
    }
    return (
      <div className="leftIn" style={{
        margin: '120px auto 30px auto',
        maxWidth: 500,
        padding: '0 30px'
      }}>
        <ReactUploadFile
          ref={(reactUploadFile) => { this.reactUploadFile = reactUploadFile; } }
          options={options}
          chooseFileButton={
            <RaisedButton label="选择" />
          }
          uploadFileButton={
            <RaisedButton primary label="上传" />
          }
          />
        <Link to="/student">
          <RaisedButton label="取消" />
        </Link>
        <Dialog
          actions={[<FlatButton onTouchTap={this.closeComfirmDialog} label="取消" />, <FlatButton secondary onTouchTap={this.uploadStart} label="确认" />]}
          open={isComfirmDialogOpen}
          onRequestClose={this.closeComfirmDialog}
          >确定上传论文?
        </Dialog>
        <Dialog
          open={isLoadingDialogOpen}
          onRequestClose={this.closeLoadingDialog}
          >
          <div className="circle" style={{
            textAlign: 'center'
          }}>
            <img src={LoadingIcon} />
          </div>
        </Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentUpload);