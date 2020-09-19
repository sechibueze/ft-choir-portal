import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { registerMember } from '../../_actions/authActions';
import { setAlert } from '../../_actions/alertActions';
import Alert from '../Alert';
import Navbar from '../Navbar';

const Signup = ({loading, history, match, isAuthenticated, setAlert, registerMember}) => {
  
  const [memberData, setMemberData] = useState({ accessId: match.params.accessId ,  firstname: '', lastname: '',  email: '', password: '', confirm_password: '' });

  const handleChange = ({ target }) => {
    setMemberData(prev => ({ ...prev, [target.name]: target.value }));
  }
  
  const handleMemberSignup = e => {
    e.preventDefault()
  
    const { firstname, lastname, email , confirm_password } = memberData;
    
    if (!firstname || !lastname || !email || !password  ) return setAlert('Invalid details', 'SIGNUP');
    if (password.trim() !== confirm_password.trim()) return setAlert('Password do not match', 'SIGNUP');
    if (password.trim().length < 6 ) return setAlert('Password is too short', 'SIGNUP');
    // if (access.trim().length !== 6 ) return setAlert('Invalid access', 'SIGNUP');
      
    
    registerMember(memberData);
  }
  const { firstname, lastname, email, password, confirm_password } = memberData;

  // if(!localStorage.getItem('accessId')) return <Redirect to='/auth' />

  if(isAuthenticated) return <Redirect to='/dashboard' />

  return (
    <Fragment>
      <Navbar />
      <div className='container'>
        <form className="form" onSubmit={handleMemberSignup}>
          <h1 className="text-lead text-light py-1 ">
            <i className="fa fa-users" /> Signup
          </h1>
          <sup>*</sup> &nbsp;&nbsp; Required
          <Alert origin='SIGNUP' />

          <div className="form-group">
            <label htmlFor="firstname">Firstname<sup>*</sup></label>
            <input type="text" name="firstname" pattern="[A-Za-z]{1,32}" onChange={handleChange} value={firstname} id="firstname" className="form-control" placeholder="Kevin" required />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname<sup>*</sup></label>
            <input type="text" name="lastname" pattern="[A-Za-z]{1,32}" onChange={handleChange} value={lastname} id="lastname" className="form-control" placeholder="Smith" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email<sup>*</sup></label>
            <input type="email" name="email" onChange={handleChange} value={email} id="email" className="form-control" placeholder="kjohn@scott.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password<sup>*</sup></label>
            <input type="password" name="password" onChange={handleChange} value={password} id="password" className="form-control" placeholder="*******" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password"> Confirm Password<sup>*</sup></label>
            <input type="password" name="confirm_password" onChange={handleChange} value={confirm_password} id="confirm_password" className="form-control" placeholder="*******" required />
          </div>
          <button type="submit" className="btn btn-primary btn-lg my-2"><i className="fa fa-users" /> &nbsp; Signup</button>

          <div className='my-1'>
          Already have an account ? <Link to='/login' className='mr-3'> Login</Link>
          {/* <Link to='/forgot-password' className='ml-3'> Forgot Password</Link> */}
         </div>
        </form>
      </div>
    </Fragment>
  );
}

Signup.propTypes = {
  registerMember: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
  
});
export default connect(mapStateToProps, { registerMember, setAlert})(Signup);
