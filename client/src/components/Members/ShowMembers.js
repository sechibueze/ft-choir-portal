import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Alert from '../Alert';
import Loader from '../Loader';
import AuthContainer from '../AuthContainer';
import { loadMembers, deleteMemberById } from '../../_actions/memberActions';
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
  flushAllData
 }) => {
  const [visible, setVisibility] = useState(false)
  useEffect(() => {
    loadMembers()
  }, [visible, deletedMember, adminAuth, flushData])

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


  if(!members) return <Loader />
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
           
              <div className="container90">
                <table className="table">
                <thead>
                  <tr>
                    <td>S/N</td>
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
              {
                members.map((member, idx) => (
                  
                    <tr>
                      <td> { ++idx} </td>
                      <td className="" >
                       <span className="fa fa-eye" onClick={() => setVisibility(true)}>
                          <Modal visible={visible} closeModal={() => setVisibility(false)}>
                            <ShowMemberProfile memberId={member._id} />
                          </Modal>
                       </span>
                      </td>
                      <td> { member.firstname} </td>
                      <td> { member.middlename} </td>
                      <td> { member.lastname} </td>
                      <td> { member.email} </td>
                      <td> { member.auth.join(' | ')} </td>
                      <td>  { formatDate(member.createdAt)} </td>
                      <td> { formatDate(member.updatedAt)} </td>
                      <td> 
                        <span className="btn btn-dark btn-sm fa fa-key" onClick={() => handleToggleAdminAuth(member._id)}> 
                         &nbsp;  { member.auth.includes('admin') ? 'REVOKE ADMIN' : 'MAKE ADMIN'}
                        </span> 
                      </td>
                      <td> 
                         <span className="btn btn-danger btn-sm fa fa-trash" onClick={() => handleDeleteMemberById(member._id)}> 
                          &nbsp; DELETE
                        </span> 
                      </td>
                    </tr>
                    
                 
                ))
              }
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
export default connect(mapStateToProps, { setAlert, loadMembers, 
  toggleAdminAuth, deleteMemberById, flushAllData})(ShowMembers);

