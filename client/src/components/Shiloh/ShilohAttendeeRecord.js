import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthContainer from '../AuthContainer';
import Register from './Register';
import Modal from '../Modal';
import Alert from '../Alert';
import { getShilohRegistrationById, resetShilohDaata } from '../../_actions/shilohActions';

import ShowShilohData from './ShowShilohData';
import EditShilohRegistration from './EditShilohRegistration';

const ShilohEvent = ({loading, currentMember,resetShilohDaata, getShilohRegistrationById, shilohData, newAttendee, updatedAttendee }) => {
  const [registerationVisibility, setRegisterationVisibility ] = useState(false)
  const [editRegisterationVisibility, setEditRegisterationVisibility ] = useState(false)
  const loadUserRegistrationForShilohWithId = () => getShilohRegistrationById(currentMember.accessId);
  useEffect(loadUserRegistrationForShilohWithId, [ newAttendee, updatedAttendee])
  const handleRegisterationVisibility = () => {
    setRegisterationVisibility(false);
    setEditRegisterationVisibility(false);
    resetShilohDaata()
  }
  if(loading && !shilohData) return <h1> Loading....</h1>
  return ( 
    <AuthContainer>
      <Modal visible={registerationVisibility} closeModal={() => handleRegisterationVisibility()}>
        <Register  closeModal={() => handleRegisterationVisibility()} />
      </Modal>
      <Modal visible={registerationVisibility} closeModal={() => handleRegisterationVisibility()}>
        <Register  closeModal={() => handleRegisterationVisibility()} />
      </Modal>
      <Modal visible={editRegisterationVisibility} closeModal={() => handleRegisterationVisibility()}>
        <EditShilohRegistration shilohData={shilohData} closeModal={() => handleRegisterationVisibility()} />
      </Modal>
      {
        !loading && shilohData ? (
          <Fragment>
            <div className="context-box">
              <span className="btn btn-success p-1" onClick={() => setEditRegisterationVisibility(true)}> Edit record </span>
            </div>
            <ShowShilohData shilohData={shilohData} />
          </Fragment>
        ) : (
          <Fragment>
           <div className="context-box">
              <h1 className="btn btn-primary m-1 p-1" onClick={() => setRegisterationVisibility(true)}> Register for shiloh </h1>
           </div>
          </Fragment>
        )
      }
       
    </AuthContainer>
   );
}
 
ShilohEvent.propTypes = {
  getShilohRegistrationById: PropTypes.func.isRequired,
  resetShilohDaata: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  newAttendee: state.shiloh.newAttendee,
  updatedAttendee: state.shiloh.updatedAttendee,
  shilohData: state.shiloh.shilohData,
  currentMember: state.auth.currentMember,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, {resetShilohDaata, getShilohRegistrationById })(ShilohEvent);
