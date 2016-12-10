import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import * as reducers from './reducers';
import App from './containers/App/App';
import Login from './containers/Login/Login';
import Help from './containers/Help/Help';
import Student from './containers/Student/Student';
import StudentInformation from './containers/Student/components/StudentInfomation.js';
import StudentProfile from './containers/Student/components/StudentProfile';
import StudentUpload from './containers/Student/components/StudentUpload';
import Teacher from './containers/Teacher/Teacher';
import TeacherOperation from './containers/Teacher/components/TeacherOperation';
import TeacherProfile from './containers/Teacher/components/TeacherProfile';
import TeacherGuidanceList from './containers/Teacher/components/TeacherGuidanceList';
import TeacherGuidance from './containers/Teacher/components/TeacherGuidance';
import Defense from './containers/Teacher/components/Defense';
import Evaluate from './containers/Teacher/components/Evaluate';
import ResultLoading from './containers/Teacher/components/ResultLoading';
import Result from './containers/Teacher/components/Result';
import Remark from './containers/Teacher/components/Remark';
import Admin from './containers/Admin/Admin';
import AdminOperation from './containers/Admin/components/AdminOperation';
import AdminProfile from './containers/Admin/components/AdminProfile';
import ManageDefense from './containers/Admin/components/ManageDefense';
import ManageTeacher from './containers/Admin/components/ManageTeacher';
import ManageStudent from './containers/Admin/components/ManageStudent';
import ChangePassword from './components/ChangePassword';

const store = createStore(combineReducers({
    ...reducers,
  routing: routerReducer
  }), 
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(routerMiddleware(hashHistory))
);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Login} />
          <Route path="/help" component={Help} />
          <Route path="/student" component={Student}>
            <IndexRoute component={StudentInformation} />
            <Route path="/student/profile" component={StudentProfile} />
            <Route path="/student/change-password" component={ChangePassword} />
            <Route path="/student/upload" component={StudentUpload} />
          </Route>
          <Route path="/teacher" component={Teacher}>
            <IndexRoute component={TeacherOperation} />
            <Route path="/teacher/profile" component={TeacherProfile} />
            <Route path="/teacher/change-password" component={ChangePassword} />
            <Route path="/teacher/guidance-list" component={TeacherGuidanceList} />
            <Route path="/teacher/guidance" component={TeacherGuidance} />
            <Route path="/teacher/defense" component={Defense} />
            <Route path="/teacher/evaluate" component={Evaluate} />
            <Route path="/teacher/result-loading" component={ResultLoading} />
            <Route path="/teacher/remark" component={Remark} />
            <Route path="/teacher/result" component={Result} />
          </Route>
          <Route path="/admin" component={Admin}>
            <IndexRoute component={AdminOperation} />
            <Route path="/admin/profile" component={AdminProfile} />
            <Route path="/admin/change-password" component={ChangePassword} />
            <Route path="/admin/manage-defense" component={ManageDefense} />
            <Route path="/admin/manage-teacher" component={ManageTeacher} />
            <Route path="/admin/manage-student" component={ManageStudent} />
          </Route>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider >,
  document.querySelector('#root')
);