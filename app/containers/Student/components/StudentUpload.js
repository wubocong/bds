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

  constructor(props) {
    super(props);
    this.state = {
      isComfirmDialogOpen: false,
      isLoadingDialogOpen: false,
      filename: '',
      file: null,
      user: Storage.getUser()
    };
  }

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

  authFile = () => {
    const { filename } = this.state;
    const { dispatch } = this.props;
    if (!filename) {
      dispatch({
        type: OPEN_SNACKBAR,
        snackbarText: '请选择论文文件！'
      });
    } else {
      this.openComfirmDialog();
    }
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

  upload = () => {
    const {user, file} = this.state;
    const token = Storage.getToken();

    this.closeComfirmDialog();
    this.openLoadingDialog();
    const { dispatch } = this.props;

    fetch(`${HOST}/papers/file/583ad38560dbd04f6216841a`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': `bearer ${token}`
      },
      body: new FormData().append('paper', new FileReader(file)),
      mode: 'no-cors'
    }).then(response => {
      console.log(response);
    });

    // this.setState({
    //     filename: ''
    // });
    this.closeLoadingDialog();
    // dispatch({
    //     type: OPEN_SNACKBAR,
    //     snackbarText: '上传成功！'
    // });
  }

  render() {

    const { isComfirmDialogOpen, isLoadingDialogOpen, filename } = this.state;
    const token = Storage.getToken();
    const options = {
      baseUrl: `${HOST}/papers/file/583ad38560dbd04f6216841a`,
      fileFieldName: 'paper',
      requestHeaders: { authorization: `bearer ${token}` },
      uploadSuccess: (resp) => {
        console.log(resp)
      }
    }
    return (
      <div className="leftIn" style={{
        margin: '120px auto 30px auto',
        maxWidth: 500,
        padding: '0 30px'
      }}>
        <ReactUploadFile options={options}
          chooseFile={
            <div style={{
              width: '100%',
              fontSize: '0.9rem',
              padding: '0 10px',
              outline: 'none',
              textAlign: 'center',
              borderBottom: '1px solid gray',
              padding: '5px'
            }}>123</div>
          }
          uploadFile={
            <div style={{
              margin: '20px 0',
              textAlign: 'center'
            }}>
              <RaisedButton primary label="上传" onTouchTap={this.authFile} />
            </div>
          }
          />

        <Dialog
          actions={[<FlatButton onTouchTap={this.closeComfirmDialog} label="取消" />, <FlatButton secondary onTouchTap={this.upload} label="确认" />]}
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