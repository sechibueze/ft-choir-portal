import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAlert } from '../../_actions/alertActions';
import AuthContainer from '../AuthContainer';
import Loader from '../Loader';
import { loadMemberProfile } from '../../_actions/profileActions';
import Modal from '../Modal';
import CreatePersonalInfo from './CreatePersonalInfo';

import ShowAuthData from './ShowAuthData';
import EditAuthData from './EditAuthData';
import ShowChurchInfo from './ShowChurchInfo';
import EditChurchInfo from './EditChurchInfo';
import ShowNOKData from './ShowNOKData';
import EditNOK from './EditNOK';
import EditPersonalInfo from './EditPersonalInfo';
import ShowPersonalInfo from './ShowPersonalInfo';
import ShowUnitInfo from './ShowUnitInfo';
import EditUnitInfo from './EditUnitInfo';
import EditMemberImage from './EditMemberImage';
import ShowMemberImage from './ShowMemberImage';

const Profile = ({
  loading, memberProfile, 
  loadMemberProfile, setAlert,

  newProfile,
  updatedMemberProfile,
  updatedAuthData,
  updatedChurchInfo,
  updatedNOKInfo,
  updatedUnitInfo,
  memberImage
}) => {

  const [profileVisibility, setProfileVisibility] = useState(false);
  const [personalVisibility, setPersonalVisibility] = useState(false);
  const [authVisibility, setAuthVisibility] = useState(false);
  const [nokVisibility, setNokVisibility] = useState(false);
  const [churchInfoVisibility, setChurchInfoVisibility] = useState(false);
  const [imageVisibility, setImageVisibility] = useState(false);
  const [unitInfoVisibility, setUnitInfoVisibility] = useState(false);
 
  useEffect(() => {
    loadMemberProfile();
  }, [
    newProfile, 
    updatedMemberProfile,
    updatedAuthData,
    updatedChurchInfo,
    updatedNOKInfo,
    updatedUnitInfo,
    memberImage
]);

  if (loading && !memberProfile) return <Loader title="Fetching profile..."/>
  return ( 
    <Fragment>
      <AuthContainer>
       
        {
          !loading && !memberProfile ? (
            <Fragment>
              <Modal visible={profileVisibility} closeModal={() => setProfileVisibility(false) }>
                <CreatePersonalInfo closeModal={() => setProfileVisibility(false) }/>
              </Modal>
              <h3 className="text-primary">No Profile yet, Create one</h3>
              <span className='btn btn-primary btn-sm my-2 fa fa-plus' 
              onClick={() => setProfileVisibility(true)}> &nbsp; Create Profile
              </span>
            </Fragment>
          ) : (
            <Fragment>
              <h1 className="text-primary"> Manage Profile</h1>
              <div className="">
                <ShowMemberImage imageUrl={memberProfile.member.imageUrl} />
                <Modal visible={imageVisibility} closeModal={() => setImageVisibility(false)}>
                  <EditMemberImage imageUrl={memberProfile.imageUrl} closeModal={() => setImageVisibility(false)} />
                </Modal>
                <span className='btn btn-primary btn-sm my-2 fa fa-edit' 
                  onClick={() => setImageVisibility(true)}> &nbsp; Update Profile Image
                </span>
              </div>

              <div className="">
                <ShowAuthData member={memberProfile.member} />
                <Modal visible={authVisibility} closeModal={() => setAuthVisibility(false)}>
                  <EditAuthData authData={memberProfile.member} closeModal={() => setAuthVisibility(false)} />
                </Modal>
                <span className='btn btn-primary btn-sm my-2 fa fa-edit' 
                  onClick={() => setAuthVisibility(true)}> &nbsp; Update Authorization Profile
                </span>
              </div>

              <div className='main-profile'>
                <ShowPersonalInfo personal={memberProfile} />
                <Modal visible={personalVisibility} closeModal={() => setPersonalVisibility(false)}>
                  <EditPersonalInfo personal={memberProfile}  closeModal={() => setPersonalVisibility(false)}/>
                </Modal>
                <span className='btn btn-primary btn-sm my-2 fa fa-edit' 
                  onClick={() => setPersonalVisibility(true)}> &nbsp; Update Personal Profile
                </span>
              </div>

              <div className="">
                <ShowUnitInfo unitInfo={memberProfile.unit_info} />
                <Modal visible={unitInfoVisibility} closeModal={() => setUnitInfoVisibility(false)}>
                  <EditUnitInfo unitInfo={memberProfile.unit_info} closeModal={() => setUnitInfoVisibility(false)} />
                </Modal>
                <span className='btn btn-primary btn-sm my-2 fa fa-edit' 
                  onClick={() => setUnitInfoVisibility(true)}> &nbsp; Update Unit Profile
                </span>
              </div>

              <div className="">
                <ShowChurchInfo churchInfo={memberProfile.church_info} />
                <Modal visible={churchInfoVisibility} closeModal={() => setChurchInfoVisibility(false)}>
                  <EditChurchInfo churchInfo={memberProfile.church_info} closeModal={() => setChurchInfoVisibility(false)} />
                </Modal>
                <span className='btn btn-primary btn-sm my-2 fa fa-edit' 
                  onClick={() => setChurchInfoVisibility(true)}> &nbsp; Update Church Profile
                </span>
              </div>

           
              <div className="">
                <ShowNOKData nok={memberProfile.nok} />
                <Modal visible={nokVisibility} closeModal={() => setNokVisibility(false)}>
                  <EditNOK nok={memberProfile.nok} closeModal={() => setNokVisibility(false)} />
                </Modal>
                <span className='btn btn-primary btn-sm my-2 fa fa-edit' 
                  onClick={() => setNokVisibility(true)}> &nbsp; Update Next of Kin Profile
                </span>
              </div>

        

              
            </Fragment>
          )
        }
      </AuthContainer>
    </Fragment>
   );
}
 
Profile.propTypes = {
  loadMemberProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  memberProfile: state.profiles.memberProfile,
  updatedMemberProfile: state.profiles.updatedMemberProfile,
  newProfile: state.profiles.newProfile,
  updatedAuthData: state.profiles.updatedAuthData,
  updatedChurchInfo: state.profiles.updatedChurchInfo,
  updatedNOKInfo: state.profiles.updatedNOKInfo,
  updatedUnitInfo: state.profiles.updatedUnitInfo,
  memberImage: state.members.memberImage
});
export default connect(mapStateToProps, { setAlert, loadMemberProfile})(Profile);

