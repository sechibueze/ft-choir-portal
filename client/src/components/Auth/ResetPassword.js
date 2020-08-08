import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import Alert from '../Alert';
import { resetMemberPassword } from '../../_actions/memberActions';

const ResetPassword = ({
   match,
   history,
   resetMemberPassword,
   passwordReset
  }) => {
  const [data, setData] = useState({ 
    password: '', 
    passwordResetToken: match.params.token
  });
  const handleChange = ({target}) => {
    setData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  }
  const handleResetPassword = e => {
    e.preventDefault();
    resetMemberPassword(data, history);
  }
  const { password } = data;
  return (
    <Fragment>
      <Navbar />
      <div className="container">
         <form className="form" onSubmit={handleResetPassword}>
           <Alert origin='RESET_MEMBER_PASSWORD' />
          <div className="form-group">
            <label htmlFor="password">Password <sup>*</sup></label>
            <input type="password" name="password" value={password} onChange={handleChange} className="form-control" id="password" required />

          </div>
          <button className="btn btn-success btn-md fa fa-check"> &nbsp; Reset My Password</button>
        </form>
      </div>
    
    </Fragment>
  );
}
 
ResetPassword.propTypes = {
  resetMemberPassword: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  passwordReset: state.members.passwordReset
});
export default connect(mapStateToProps, { resetMemberPassword })(withRouter(ResetPassword));
 
