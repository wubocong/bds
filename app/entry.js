import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import * as reducers from './reducers';
import App from './containers/App/App';
import Login from './containers/Login/Login';
import Student from './containers/Student/Student';
import StudentInformation from './containers/Student/components/StudentInfomation.js';
import StudentProfile from './containers/Student/components/StudentProfile';
import Teacher from './containers/Teacher/Teacher';
import TeacherOperation from './containers/Teacher/components/TeacherOperation';
import TeacherProfile from './containers/Teacher/components/TeacherProfile';
import Admin from './containers/Admin/Admin';
import AdminOperation from './containers/Admin/components/AdminOperation';
import AdminProfile from './containers/Admin/components/AdminProfile';
import ChangePassword from './components/ChangePassword';

const store = createStore(combineReducers({
    ...reducers,
    routing: routerReducer
  }), 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
  applyMiddleware(thunk, routerMiddleware(hashHistory))
);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Login} />
          <Route path="/student" component={Student}>
            <IndexRoute component={StudentInformation} />
            <Route path="/student/profile" component={StudentProfile} />
            <Route path="/student/change-password" component={ChangePassword} />
          </Route>
          <Route path="/teacher" component={Teacher}>
            <IndexRoute component={TeacherOperation} />
            <Route path="/teacher/profile" component={TeacherProfile} />
            <Route path="/teacher/change-password" component={ChangePassword} />
          </Route>
          <Route path="/admin" component={Admin}>
            <IndexRoute component={AdminOperation} />
            <Route path="/admin/profile" component={AdminProfile} />
            <Route path="/admin/change-password" component={ChangePassword} />
          </Route>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider >,
  document.querySelector('#root')
);