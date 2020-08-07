import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { becomeAdmin } from '../../_actions/adminActions';
import Navbar from '../Navbar';
import Alert from '../Alert';

const Access = ({ becomeAdmin }) => {
  const [access, setAccess] = useState({ email: ''});
  const handleChange = ({ target }) => {
    setAccess({[target.name]:target.value})
  }
  const handleAccessRequest = e => {
    e.preventDefault()
    becomeAdmin(access)
  }
 const { email } = access;
  return ( 
    <Fragment>
      <Navbar />
      <div className='container'>
        <form onSubmit={handleAccessRequest} className="form">
          <h1 className="text-lead text-light py-1">&nbsp;
            <i className="fa  fa-key" /> &nbsp;
        Verify
      </h1>
          <Alert origin="BECOME_ADMIN" />

          <div className="form-group">
            <label htmlFor="access">Access token</label>
            <input type="email" name="email" onChange={handleChange} value={email} id="access" className="form-control"
              placeholder="Please enter the email of a valid member" />
            <button type="submit" className="btn btn-danger btn-md my-2 fa fa-key"> &nbsp;Confirm</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
 

Access.propTypes = {
  becomeAdmin: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  currentMember: state.auth.currentMember,
});
export default connect(mapStateToProps, { becomeAdmin })(Access);
