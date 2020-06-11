import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Authenticate from './_utils/Authenticate';
import Home from './components/Home/Home';
import Access from './components/Auth/Access';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Members from './components/Members/ShowMembers';

import { loadCurrentMember } from './_actions/authActions';
import store from './store';
store.dispatch(loadCurrentMember());

const App = () => {
  
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/access' component={Access} />
          <Route exact path='/forgot-password' component={ForgotPassword} />
          <Route exact path='/reset-password' component={ResetPassword} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Authenticate exact path='/dashboard' component={Dashboard} />
          <Authenticate exact path='/profile' component={Profile} />
          <Authenticate exact path='/members' component={Members} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
