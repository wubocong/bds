import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import { CHANGE_TITLE } from '../../App/constants';
import { SYSTEM_NAME } from '../../../constants';
import Storage from '../../../models/Storage';

const PaperStyle = {
    margin: '20px 0',
    padding: 20
}

class StudentInformation extends Component {

    constructor(props) {
        super(props);
        let user = Storage.getUser();
        const { paper, teacher, defense } = user;
        if (!paper) {
            user = Object.assign({}, user, {
                paper: {
                    name: '宠物健康管家APP设计与开发',
                    desp: '现在越来越多人选择在家里养宠物，但是由于工作忙，照料宠物的时间很少。随着移动互联网和传感器的兴起，在宠物身上佩戴具有定位功能、身体指标监控的传感器，人可以在手机端随时查看宠物的位置、宠物的健康状态，以实现对宠物的健康管理。',
                    filepath: '',
                    filename: '',
                    comments: [{
                        content: '指导意见，指导意见，指导意见，指导意见，指导意见，指导意见，指导意见，指导意见，指导意见，指导意见，指导意见，指导意见。',
                        time: 0
                    }, {
                        content: '指导意见，指导意见，指导意见，指导意见，指导意见，指导意见。',
                        time: 0
                    }, {
                        content: '指导意见，指导意见，指导意见，指导意见，指导意见，指导意见。',
                        time: 0
                    }]
                }
            });
        }
        if (!teacher) {
            user = Object.assign({}, user, {
                teacher: {
                    name: '潘教授'
                }
            });
        }
        if (!defense) {
            user = Object.assign({}, user, {
                defense: {
                    status: 0,
                    time: 0,
                    address: '答辩地址答辩地址答辩地址',
                    scopes: [{
                        sum: 80,
                        name: 'teacher1'
                    }, {
                        sum: 100,
                        name: 'teacher2'
                    }, {
                        sum: 90,
                        name: 'teacher3'
                    }],
                    remark: '论文评价，论文评价，论文评价，论文评价，论文评价，论文评价，论文评价，论文评价，论文评价论文评价。'
                }
            });
        }
        let activeStep;
        if (!user.paper.filepath) {
            activeStep = 0;
        } else {
            activeStep = 1;
        }
        if(user.defense.status === 2){
          activeStep = 2;
        }
        this.state = {
            user,
            activeStep
        };
    }

    componentWillMount() {
        const token = Storage.getToken();
        const { dispatch } = this.props;
        if (!token) {
            dispatch(push('/'));
        } else {
            dispatch({
                type: CHANGE_TITLE,
                title: SYSTEM_NAME
            });
        }
    }

    render() {

        const { activeStep, user } = this.state;
        const { paper, teacher, defense } = user;

        let paperPaper;
        let guidancePaper;
        let progressPaper;

        if (paper && teacher) {
            paperPaper = <Paper style={PaperStyle} zDepth={2}>
                <div style={{
                    fontSize: '1.3rem',
                    marginBottom: 5
                }}>{paper.name}</div>
                <div style={{
                    fontSize: '0.75rem',
                    marginBottom: 10
                }}>指导老师 {teacher.name}</div>
                <div style={{
                    fontSize: '0.9rem',
                    paddingLeft: '1.8rem',
                    lineHeight: '1.3rem'
                }}>{paper.desp}</div>
            </Paper>;

            let progressOne;
            let progressTwo;
            let progressThree;

            if (paper.filepath) {
                progressOne = <div style={{
                    margin: '20px 0'
                }}>
                    <a href={paper.filepath} target="_blank"><RaisedButton label={paper.filename} /></a>
                    <a href={paper.filepath} target="_blank"><RaisedButton primary label="下载" /></a>
                    <Link to="/student/upload"><RaisedButton secondary label="重新上传" /></Link>
                </div>
                if (defense.status === 0) {
                    progressTwo = <Paper zDepth={1} style={{
                        margin: '20px 0',
                        padding: 20
                    }}>
                        <div style={{
                            fontSize: '1rem',
                            margin: '10px 0 20px 0'
                        }}>答辩安排</div>
                        <div style={{
                            fontSize: '0.8rem'
                        }}>请等待后续安排。</div>
                    </Paper>
                } else if (defense.status === 1) {
                    const time = new Date(defense.time);
                    const year = time.getFullYear();
                    const month = time.getMonth() + 1;
                    const date = time.getDate();
                    const hour = time.getHours();
                    const minute = time.getMinutes();

                    progressTwo = <Paper zDepth={1} style={{
                        margin: '20px 0',
                        padding: 20
                    }}>
                        <div style={{
                            fontSize: '1rem',
                            margin: '10px 0 20px 0'
                        }}>答辩安排</div>
                        <div style={{
                            fontSize: '0.8rem',
                            lineHeight: '1.6rem'
                        }}>
                            答辩老师：{
                                defense.scopes.map(scope => {
                                    return ' ' + scope.name
                                })
                            }<br />
                            时间：{year}年{month}月{date}日{hour}时{minute}分<br />
                            地点：{defense.address}
                        </div>
                    </Paper>
                } else if (defense.status === 2) {

                  progressOne = '';

                    let total = 0;
                    for(let scope of defense.scopes){
                      total += scope.sum;
                    }
                    let avarage = total / defense.scopes.length;
                    progressTwo = <Paper zDepth={1} style={{
                        margin: '20px 0',
                        padding: 20
                    }}>
                        <div style={{
                            fontSize: '1rem',
                            marginBottom: 5,
                            lineHeight: '1.5rem'
                        }}>
                          分数：{avarage}<br/>
                          论文评价：
                        </div>
                        <div style={{
                            fontSize: '0.8rem',
                            paddingLeft: 20,
                            lineHeight: '1.2rem'
                        }}>{defense.remark}</div>
                    </Paper>
                }
            } else {
                progressOne = <Link to="/student/upload"><RaisedButton primary label="上传论文" /></Link>
            }

            progressPaper = <Paper zDepth={2} style={{
                margin: '20px 0',
                padding: 20,
            }}>
                <Stepper zDepth={2} activeStep={activeStep}>
                    <Step>
                        <StepLabel>上传论文</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>等待答辩</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>完成答辩</StepLabel>
                    </Step>
                </Stepper>
                {progressOne}
                {progressTwo}
            </Paper>

            if (paper.comments.length) {
                guidancePaper = <Paper zDepth={2} style={{
                    padding: '20px',
                    margin: '20px 0'
                }}>
                    <div style={{
                        fontSize: '1.3rem'
                    }}>指导老师意见</div>
                    {
                        paper.comments.map((comment, key) => {
                            const time = new Date(comment.time);
                            const year = time.getFullYear();
                            const month = time.getMonth() + 1;
                            const date = time.getDate();
                            return (
                                <Paper key={key} zDepth={1} style={{
                                    padding: 10,
                                    margin: '15px 0'
                                }}>
                                    <div style={{
                                        fontSize: '0.9rem',
                                        lineHeight: '1.35rem',
                                        textIndent: '1.8rem'
                                    }}>{comment.content}</div>
                                    <div style={{
                                        fontSize: '0.7rem',
                                        color: 'gray',
                                        textAlign: 'right',
                                        marginTop: 10
                                    }}>指导老师：{teacher.name}&nbsp;&nbsp;&nbsp;时间：{year}年{month}月{date}日</div>
                                </Paper>
                            );
                        })
                    }
                </Paper>
            }

        } else {
            paperPaper = <Paper style={PaperStyle} zDepth={2}>
                未选题.
          </Paper>;
        }



        return (
            <div className="leftIn" style={{
                margin: '80px auto 30px auto',
                maxWidth: 500
            }}>
                {paperPaper}
                {guidancePaper}
                {progressPaper}
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentInformation);