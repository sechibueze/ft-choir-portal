import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Alert from '../Alert';
import Loader from '../Loader';
import AuthContainer from '../AuthContainer';
import { loadMembers, deleteMemberById, clearMemberProfile } from '../../_actions/memberActions';
import { toggleAdminAuth, flushAllData  } from '../../_actions/adminActions';
import { setAlert } from '../../_actions/alertActions';
import formatDate from '../formatDate';
import Modal from '../Modal';
import ShowMemberProfile from './ShowMemberProfile';
import GenerateProfileReport from './GenerateProfileReport';

const ShowMembers = ({loading, members, 
  loadMembers, setAlert, 
  deleteMemberById, 
  deletedMember,
  adminAuth,
  toggleAdminAuth,
  flushData,
  flushAllData,
  clearMemberProfile
 }) => {
  const [status, setStatus] = useState({
    id: null,
    open: false
  })
  useEffect(() => {
    loadMembers()
  }, [status, deletedMember, adminAuth, flushData])

  const handleToggleAdminAuth = (memberId) => {
    if (window.confirm('Are you sure ?')) {
      toggleAdminAuth(memberId)
    }
  }
  const handleDeleteMemberById = (memberId) => {
    if (window.confirm('Irreversible ! Are you sure ?')) {
      deleteMemberById(memberId)
    }
  }
  const handleFlushData = () => {
    if (window.confirm('Irreversible ! Are you sure ?')) {
      flushAllData()
    }
  }
  const showProfile = (id) => {
    setStatus(prev => ({
      ...prev,
      open: true,
      id
    }))
  }
  const closeModal = () => {

    setStatus(prev => ({
      ...prev,
      open: false,
      id: null
    }))
  clearMemberProfile()
  }


  if(!members) return <Loader />
  const { id, open} = status;
  return (     
    <AuthContainer>
      <Fragment>
        <Alert origin='MEMBER' />
        
          {
           members !== null && members.length < 1 ? (
             <h1 className="text-primary"> No members yet</h1>
           ) : (
            <Fragment>
              <div className="container">
                <div className="dashboard-action">
                  <GenerateProfileReport />
                </div>
              </div>
              <div>
                {
                  id && open ? (
                    <Modal visible={open} closeModal={() => closeModal()}>
                      <ShowMemberProfile memberId={id} />
                    </Modal>
                  ): null
                }
              </div>
           
              <div className="container90">
                <table className="table">
                <thead>
                  <tr>
                    <td>S/N</td>
                    <td> ID </td>
                    <td>View </td>
                    <td>Firstname</td>
                    <td>Middlename</td>
                    <td>Lastname</td>
                    <td>Email</td>
                    <td> Levels </td>
                    <td> Created</td>
                    <td>Updated</td>
                    <td>Manage Levels</td>
                    <td>Delete</td>
                  </tr>
                </thead>
                <tbody>
              {
                members.map((member, idx) => {
                  const {_id, accessId, firstname, 
                    middlename, lastname, email, auth } = member;
                  return (
                    <tr style={{textAlign: 'left'}}>
                      <td> { ++idx} </td>
                      <td> { accessId && accessId } </td>
                      <td className="" >
                       <span className="fa fa-eye" onClick={() => showProfile(_id)} />
                          
                      </td>
                      <td> { firstname && firstname} </td>
                      <td> { middlename && middlename} </td>
                      <td> { lastname && lastname } </td>
                      <td> { email && email } </td>
                      <td> { auth &&  auth.join(' | ')} </td>
                      <td>  { formatDate(member.createdAt)} </td>
                      <td> { formatDate(member.updatedAt)} </td>
                      <td> 
                        <span className="btn btn-dark btn-sm fa fa-key" onClick={() => handleToggleAdminAuth(_id)}> 
                         &nbsp;  { auth && auth.includes('admin') ? 'REVOKE ADMIN' : 'MAKE ADMIN'}
                        </span> 
                      </td>
                      <td> 
                         <span className="btn btn-danger btn-sm fa fa-trash" onClick={() => handleDeleteMemberById(_id)}> 
                          &nbsp; DELETE
                        </span> 
                      </td>
                    </tr>
                  )
                    
                 
                })
              }
              </tbody>
              </table>
              </div>
              <div className="container">
                  <div className="dashboard-action">
                    <span 
                    
                      className="btn btn-danger btn-lg fa fa-trash" onClick={() => handleFlushData()}>
                      &nbsp; DELETE ALL RECORDS
                    </span>
                  </div>
              </div>
            </Fragment>
           ) 
        }
     

      </Fragment>
    </AuthContainer>    
   );
}
 
ShowMembers.propTypes = {
  loadMembers: PropTypes.func.isRequired,
  clearMemberProfile: PropTypes.func.isRequired,
  deleteMemberById: PropTypes.func.isRequired,
  toggleAdminAuth: PropTypes.func.isRequired,
  flushAllData: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  members: state.members.members,
  deletedMember: state.members.deletedMember,
  adminAuth: state.admin.adminAuth,
  flushData: state.admin.flushData
});
export default connect(mapStateToProps, { setAlert, loadMembers, clearMemberProfile,
  toggleAdminAuth, deleteMemberById, flushAllData})(ShowMembers);

