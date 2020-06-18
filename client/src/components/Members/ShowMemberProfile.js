import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import Moment from 'react-moment';
import PropTypes from 'prop-types';
// import Alert from '../Alert';
import Loader from '../Loader';
// import AuthContainer from '../AuthContainer';
import { loadProfileByMemberId } from '../../_actions/memberActions';
import { setAlert } from '../../_actions/alertActions';
// import formatDate from '../formatDate';
import ShowNOKData from '../Profile/ShowNOKData';
import ShowAuthData from '../Profile/ShowAuthData';
import ShowChurchInfo from '../Profile/ShowChurchInfo';
import ShowUnitInfo from '../Profile/ShowUnitInfo';
import ShowPersonalInfo from '../Profile/ShowPersonalInfo';


const ShowMemberProfile = ({ memberId, memberData, loadProfileByMemberId }) => {
  // if(!memberId) return null
  useEffect(() => {
    loadProfileByMemberId(memberId)
  }, [memberId])

  if(!memberData) return <Loader />
  return ( 
    <Fragment>
      <ShowAuthData member={memberData.member} />
      <ShowPersonalInfo personal={memberData} />
      <ShowUnitInfo unitInfo={memberData.unit_info} />
      <ShowChurchInfo churchInfo={memberData.church_info} />
      <ShowNOKData nok={memberData.nok} />

    </Fragment>
   );
}
 
ShowMemberProfile.propTypes = {
  loadProfileByMemberId: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  memberData: state.members.memberData
});
export default connect(mapStateToProps, { setAlert, loadProfileByMemberId})(ShowMemberProfile);
