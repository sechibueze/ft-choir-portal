import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../Navbar';
// import Alert from '../Alert';

const ResetPassword = ({ match}) => {
  const [data, setData] = useState({ password: ''});
  const handleChange = ({target}) => {
    setData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  }
  const handleResetPassword = e => {
    e.preventDefault()
    window.confirm('Password reset to + ' + data.password)
  }
  const { password } = data;
  return (
    <Fragment>
      <Navbar />
      <div className="container">
         <form className="form" onSubmit={handleResetPassword}>
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
  loading: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});
export default connect(mapStateToProps)(ResetPassword);
 
