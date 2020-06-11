import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../Navbar';
// import Alert from '../Alert';

const ForgotPassword = () => {
  const [data, setData] = useState({ email: ''});
  const handleChange = ({target}) => {
    setData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  }
  const handleForgotPassword = (e) => {
    e.preventDefault()
    window.confirm('Password reset link sent to' + data.email)
  }
  const { email } = data;
  return (
    <Fragment>
      <Navbar />
      <div className="container">
         <form className="form" onSubmit={ handleForgotPassword}>
          <div className="form-group">
            <label htmlFor="email">Email <sup>*</sup></label>
            <input type="email" name="email" value={email} onChange={handleChange} className="form-control" placeholder="jkevin@scott.com" id="email" required />

          </div>
          <button className="btn btn-success btn-md fa fa-check"> &nbsp; Send Password Reset Link</button>
        </form>
      </div>
    
    </Fragment>
  );
}
 
ForgotPassword.propTypes = {
  loading: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});
export default connect(mapStateToProps)(ForgotPassword);
 
