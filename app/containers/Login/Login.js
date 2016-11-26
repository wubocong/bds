import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
import { push } from 'react-router-redux';

import { OPEN_SNACKBAR } from '../App/constants';
import { HOST, SYSTEM_NAME } from '../../constants';
import Storage from '../../models/Storage';

const loginPageStyle = {
    margin: '50px auto 20px auto',
    maxWidth: 400,
    padding: '0 30px'
};
const titleStyle = {
    fontSize: '3rem',
    textAlign: 'center',
    marginBottom: '50px'
};
const radioButtonGroupStyle = {
    margin: '20px 0'
};

class Login extends Component {

    constructor(props) {

        super(props);
        this.state = {
            account: 'ls',
            password: 'phy',
            role: 'teacher',
            isLogining: false
        };
    }

    // 检查是否已登录
    componentWillMount() {
        const token = Storage.getToken();
        const { dispatch } = this.props;
        if (token) {
            const user = Storage.getUser();
            dispatch(push('/' + user.role));
        }
    }

    setAccount = event => {
        this.setState({
            account: event.target.value
        });
    }

    setPassword = event => {
        this.setState({
            password: event.target.value
        });
    }

    setRole = event => {
        this.setState({
            role: event.target.value
        });
    }

    loginAuth = () => {
        const { dispatch } = this.props;
        const { account, password, role } = this.state;

        // 未输入账号
        if (!account) {
            dispatch({
                type: OPEN_SNACKBAR,
                snackbarText: '请输入账号！'
            });
            return;
        }

        // 未输入密码
        if (!password) {
            dispatch({
                type: OPEN_SNACKBAR,
                snackbarText: '请输入密码！'
            });
            return;
        }

        this.setState({
            isLogining: true
        });

        // 验证账号密码角色
        fetch(HOST + '/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account,
                password,
                role
            })
        }).then(response => {

            // 验证失败
            if (response.status !== 200) {
                this.setState({
                    isLogining: false
                });
                dispatch({
                    type: OPEN_SNACKBAR,
                    snackbarText: '请检查账号、密码或者身份是否正确！'
                });
            }

            // 验证成功
            else {
                response.json().then(json => {
                    const { token, user } = json;

                    // 登录成功
                    this.setState({
                        isLogining: false
                    });

                    // 保存token
                    Storage.setToken(token);

                    // 保存user
                    Storage.setUser(user);

                    // 路由跳转
                    dispatch(push('/' + user.role));
                });
            }
        },

            // 网络错误
            error => {
                this.setState({
                    isLogining: false
                });
                dispatch({
                    type: OPEN_SNACKBAR,
                    snackbarText: '网络错误！请检查网络情况！'
                });
            });
    }

    render() {
        const { account, password, role, isLogining } = this.state;
        return (
            <div style={loginPageStyle}>
                <h1 style={titleStyle}>{SYSTEM_NAME}</h1>
                <TextField floatingLabelText="账号" defaultValue={account} fullWidth className="text-field" onChange={this.setAccount} />
                <TextField type="password" floatingLabelText="密码" defaultValue={password} fullWidth className="text-field" onChange={this.setPassword} />
                <RadioButtonGroup name="role" defaultSelected={role} style={radioButtonGroupStyle} onChange={this.setRole}>
                    <RadioButton value="admin" label="管理员" className="role-item" />
                    <RadioButton value="teacher" label="教师" className="role-item" />
                    <RadioButton value="student" label="学生" className="role-item" />
                </RadioButtonGroup>
                <RaisedButton label={isLogining ? '登录中...' : '登录'} primary fullWidth disabled={isLogining} className="login-button" onTouchTap={this.loginAuth} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};
const mapDispathToProps = dispatch => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispathToProps)(Login);