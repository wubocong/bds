import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import Storage from '../models/Storage';
import { CHANGE_TITLE, OPEN_SNACKBAR } from '../containers/App/constants';
import { HOST } from '../constants';

const buttonContainerStyle = {
    marginTop: 30,
    textAlign: 'center'
}
const buttonStyle = {
    margin: '10px'
};

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: Storage.getUser(),
            oldPassword: '',
            newPassword: '',
            repeatNewPassword: '',
            isDialogOpen: false
        };
    }

    // 是否已登录
    componentWillMount() {
        const token = Storage.getToken();
        const { dispatch } = this.props;
        if (!token) {
            dispatch(push('/'));
        } else {
            dispatch({
                type: CHANGE_TITLE,
                title: '修改密码'
            });
        }
    }

    setOldPassword = event => {
        this.setState({
            oldPassword: event.target.value
        });
    }

    setNewPassword = event => {
        this.setState({
            newPassword: event.target.value
        });
    }

    setRepeatNewPassword = event => {
        this.setState({
            repeatNewPassword: event.target.value
        });
    }

    comparePassword = () => {
        const { newPassword, repeatNewPassword } = this.state;
        const { dispatch } = this.props;
        if (newPassword && repeatNewPassword) {
            if (newPassword !== repeatNewPassword) {
                dispatch({
                    type: OPEN_SNACKBAR,
                    snackbarText: '两次密码不一致，请重新输入！'
                });
            }
        }
    }

    changePassword = () => {
        this.closeDialog();
        const { oldPassword, newPassword, repeatNewPassword, user } = this.state;
        const { dispatch } = this.props;
        if (!oldPassword) {
            dispatch({
                type: OPEN_SNACKBAR,
                snackbarText: '请输入原密码！'
            });
        } else if (!newPassword) {
            dispatch({
                type: OPEN_SNACKBAR,
                snackbarText: '请输入新密码！'
            });
        } else if (!repeatNewPassword) {
            dispatch({
                type: OPEN_SNACKBAR,
                snackbarText: '请重复输入新密码！'
            });
        } else if (newPassword !== repeatNewPassword) {
            dispatch({
                type: OPEN_SNACKBAR,
                snackbarText: '两次密码输入不一致，请重新输入！'
            });
        } else {
            const { user } = this.state;
            const token = Storage.getToken();
            fetch(`${HOST}/users/password/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${token}`
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                    role: user.role
                })
            }).then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: OPEN_SNACKBAR,
                        snackbarText: '修改成功！'
                    });
                    dispatch(push('/' + user.role));
                    Storage.updateTokenTime();
                } else if (response.status === 422 || response.status === 401) {
                    dispatch({
                        type: OPEN_SNACKBAR,
                        snackbarText: '原密码错误！'
                    });
                } else {
                    dispatch({
                        type: OPEN_SNACKBAR,
                        snackbarText: '修改失败！请重试！'
                    });
                }
            }, error => {
                dispatch({
                    type: OPEN_SNACKBAR,
                    snackbarText: '网络错误！请检查网络连接是否正常！'
                });
            });
        }
    }

    openDialog = () => {
        this.setState({
            isDialogOpen: true
        });
    }

    closeDialog = () => {
        this.setState({
            isDialogOpen: false
        });
    }

    render() {
        const {user, oldPassword, newPassword, repeatNewPassword, isDialogOpen } = this.state;
        return (
            <div style={{
                maxWidth: 400,
                margin: '100px auto 20px auto',
                padding: '0 30px'
            }} className="leftIn">
                <TextField fullWidth floatingLabelText="账号" defaultValue={user.account} disabled />
                <TextField onChange={this.setOldPassword} type="password" defaultValue={oldPassword} fullWidth floatingLabelText="原密码" />
                <TextField onChange={this.setNewPassword} onBlur={this.comparePassword} type="password" defaultValue={newPassword} fullWidth floatingLabelText="新密码" />
                <TextField onChange={this.setRepeatNewPassword} onBlur={this.comparePassword} type="password" defaultValue={repeatNewPassword} fullWidth floatingLabelText="重复新密码" />
                <div style={buttonContainerStyle}>
                    <Link to={'/' + user.role + '/profile'}><RaisedButton style={buttonStyle} label="取消" /></Link>
                    <RaisedButton onTouchTap={this.openDialog} style={buttonStyle} secondary label="确认" />
                </div>
                <Dialog
                    actions={[<FlatButton keyboardFocused onTouchTap={this.closeDialog} label="取消" />, <FlatButton secondary onTouchTap={this.changePassword} label="确认" />]}
                    open={isDialogOpen}
                    onRequestClose={this.closeDialog}
                    >确定修改密码?</Dialog>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);