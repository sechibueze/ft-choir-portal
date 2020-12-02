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
import PostAdmin from './components/Posts/PostAdmin';
import PostPage from './components/Posts/PostPage';
import Members from './components/Members/ShowMembers';
import NotFound from './components/NotFound';

import { loadCurrentMember } from './_actions/authActions';
import store from './store';
import VerifyAccessId from './components/Auth/VerifyAccessId';
import AccessAdmin from './components/AccessAdmin/AccessAdmin';
import ShilohAttendeeRecord from './components/Shiloh/ShilohAttendeeRecord';
import ShilohManager from './components/Shiloh/ShilohManager';
store.dispatch(loadCurrentMember());

const App = () => {
  
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/grantaccess' component={Access} />
          <Route exact path='/forgot-password' component={ForgotPassword} />
          <Route path='/password-reset/:token?' component={ResetPassword} />
           
          <Route exact path='/auth' component={VerifyAccessId} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup/:accessId' component={Signup} />
          <Authenticate exact path='/dashboard' component={Dashboard} />
          <Authenticate exact path='/profile' component={Profile} />
          <Authenticate exact path='/members' component={Members} />
          <Authenticate exact path='/posts' component={PostPage} />
          <Authenticate exact path='/post-admin' component={PostAdmin} />
          <Authenticate exact path='/access-admin' component={AccessAdmin} />
          <Authenticate exact path='/shiloh-attendee' component={ShilohAttendeeRecord} />
          <Authenticate exact path='/shiloh-manager' component={ShilohManager} />
          <Route component={NotFound} />

          {/* <div className="footer" style={{ backgroundColor: '#333'}}>
            <p> Powered by: <a style={{color: '#fff'}} href="https://ftwinnersictg.org" target="_blank">
              <img src="./img/ictg-logo.png" alt="developer logo"/>
              ICTGroup </a></p>
          </div> */}
          
        </Switch>
          <div className="footer" style={{ margin: 'auto', textAlign:'center', backgroundColor: '#333', padding: '1rem'}}>
            <p style={{color: '#fff', fontSize: '0.8rem'}}> Powered by <a style={{color: '#fff', fontSize: '0.8rem'}} href="https://ftwinnersictg.org" target="_blank">
              <img style={{
                width: '55px',
                verticalAlign: 'bottom',
                paddingRight: '1rem',
              }} src="./img/ictg-logo.png" alt="developer logo"/>
              Canaanland, Ota </a></p>
          </div>
      </Router>
    </Provider>
  );
};

export default App;
