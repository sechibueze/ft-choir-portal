import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginMember } from '../../_actions/authActions';
import { setAlert } from '../../_actions/alertActions';
import Alert from '../Alert';
import Navbar from '../Navbar';


const Login = ({ loading, isAuthenticated, loginMember, setAlert }) => {
  const [memberLogin, setMemberLogin] = useState({ email: '', password: '' });

  const handleChange = ({ target }) => {
    setMemberLogin(prev => ({...prev, [target.name]: target.value}));
  }
  const handleMemberLogin = e => {
    e.preventDefault();
    loginMember(memberLogin);
  }
  const { email, password } = memberLogin;
  if(isAuthenticated) return <Redirect to='/dashboard'/>
  return (
    <Fragment>
      <Navbar />
      <div className='container'>
        <form  className="form" onSubmit={handleMemberLogin}>
          <h1 className="text-lead text-light py-1 ">
            <i className="fa fa-sign-in" /> Login
          </h1>
          <sup>*</sup> &nbsp;&nbsp; Required
           <Alert origin='LOGIN' />
           <Alert origin='RESET_MEMBER_PASSWORD' />

          <div className="form-group">
            <label htmlFor="email">Email<sup>*</sup></label>
            <input type="email" name="email" onChange={handleChange} value={email} id="email" className="form-control" placeholder="kjohn@scott.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password<sup>*</sup></label>
            <input type="password" name="password" onChange={handleChange} value={password} id="password" className="form-control" placeholder="*******" required />
          </div>
          <button type="submit" className="btn btn-primary btn-lg my-2"><i className="fa fa-sign-in" /> &nbsp; Login</button>

         <div className='my-1'>
          <Link to='/auth' className='mr-3'> Sign up</Link>
          <Link to='/forgot-password' className='ml-3'> Forgot Password</Link>
         </div>
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  loginMember: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
  
});
export default connect(mapStateToProps, { loginMember, setAlert})(Login);