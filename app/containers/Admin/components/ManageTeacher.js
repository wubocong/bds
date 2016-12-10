import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { OPEN_SNACKBAR, CONFIG_APPBAR } from '../../App/constants';
import ReturnIconButton from '../../../components/ReturnIconButton';

const inputButtonStyle = {
  width: 'calc(50% - 20px)',
  margin: '0 10px'
};

class ManageTeacher extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSingleInputDialogOpen: true,
      isBatchInputDialogOpen: false
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: CONFIG_APPBAR,
      appbarConfig: {
        isAppbarOpen: true,
        title: '管理教师信息',
        appbarLeftElement: <ReturnIconButton href="/admin" />,
        appbarRightElement: null
      }
    });
  }

  openSingleInputDialog = () => {
    this.setState({
      isSingleInputDialogOpen: true
    });
  }

  closeSingleInputDialog = () => {
    this.setState({
      isSingleInputDialogOpen: false
    });
  }

  beforeSingleUpload = () => {

  }

  openBatchInputDialog = () => {
    this.setState({
      isBatchInputDialogOpen: true
    });
  }

  closeBatchInputDialog = () => {
    this.setState({
      isBatchInputDialogOpen: false
    });
  }

  beforeBatchUpload = () => {

  }

  render() {
    let { isSingleInputDialogOpen, isBatchInputDialogOpen } = this.state;
    return (
      <div className="leftIn" style={{
        margin: '80px auto 30px auto',
        maxWidth: 450
      }}>
        <div>
          <RaisedButton onTouchTap={this.openSingleInputDialog} primary label="录入教师信息" style={inputButtonStyle} />
          <RaisedButton onTouchTap={this.openBatchInputDialog} primary label="批量录入教师信息" style={inputButtonStyle} />
        </div>
        <Dialog
          title="录入教师信息"
          actions={[<FlatButton onTouchTap={this.closeSingleInputDialog}>取消</FlatButton>, <FlatButton onTouchTap={this.beforeSingleUpload} secondary>录入</FlatButton>]}
          modal={false}
          open={isSingleInputDialogOpen}
          onRequestClose={this.closeSingleInputDialog}
          autoScrollBodyContent={true}
          >
          <TextField fullWidth floatingLabelText="工号" />
          <TextField fullWidth floatingLabelText="姓名" />
          <SelectField fullWidth floatingLabelText="性别">
            <MenuItem value={true} primaryText="男" />
            <MenuItem value={false} primaryText="女" />
          </SelectField>
          <SelectField fullWidth floatingLabelText="职称">
            <MenuItem value={4} primaryText="教授" />
            <MenuItem value={3} primaryText="副教授" />
            <MenuItem value={2} primaryText="讲师" />
            <MenuItem value={1} primaryText="助教" />
            <MenuItem value={0} primaryText="无" />
          </SelectField>
          <SelectField fullWidth floatingLabelText="学历">
            <MenuItem value={4} primaryText="博士" />
            <MenuItem value={3} primaryText="硕士" />
            <MenuItem value={2} primaryText="本科" />
            <MenuItem value={1} primaryText="专科" />
            <MenuItem value={0} primaryText="无" />
          </SelectField>
          <TextField fullWidth floatingLabelText="邮箱" />
          <TextField fullWidth floatingLabelText="电话" />
        </Dialog>
        <Dialog
          title="批量录入教师信息"
          actions={[<FlatButton onTouchTap={this.closeBatchInputDialog}>取消</FlatButton>, <FlatButton onTouchTap={this.beforeBatchUpload} secondary>录入</FlatButton>]}
          modal={false}
          open={isBatchInputDialogOpen}
          onRequestClose={this.closeBatchInputDialog}
          >
          <input type="file" placeholder="教师信息EXCEL文件" style={{
            width: '100%'
          }} />
          <br />
          <br />
          <a href="http://panhongyi.net" target="_blank" style={{
            fontSize: '0.9rem'
          }}>下载模板EXCLE文件</a>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
};

export default connect(mapStateToProp, mapDispatchToProps)(ManageTeacher);