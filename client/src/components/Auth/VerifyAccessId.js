import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyAccessId } from '../../_actions/authActions';
import Navbar from '../Navbar';
import Alert from '../Alert';

const VerifyAccessId = ({ history, verifyAccessId }) => {
  const [access, setAccess] = useState({ accessId: ''});
  const handleChange = ({ target }) => {
    setAccess({[target.name]:target.value})
  }
  const handleAccessRequest = e => {
    e.preventDefault()
    verifyAccessId(access, history);
  }
 const { accessId } = access;
  return ( 
    <Fragment>
      <Navbar />
      <div className='container'>
        <form onSubmit={handleAccessRequest} className="form">
          <h1 className="text-lead text-light py-1">&nbsp;
            <i className="fa  fa-key" /> &nbsp;
        Verify
      </h1>
          <Alert origin="VERIFY_ACCESS_ID" />

          <div className="form-group">
            <label htmlFor="access">Access token</label>
            <input type="text" name="accessId" onChange={handleChange} value={accessId} id="access" className="form-control"
              placeholder="Please enter your ID" />
            <button type="submit" className="btn btn-danger btn-md my-2 fa fa-key"> &nbsp;Confirm</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
 

VerifyAccessId.propTypes = {
  verifyAccessId: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  currentMember: state.auth.currentMember,
});
export default connect(mapStateToProps, { verifyAccessId })(VerifyAccessId);
