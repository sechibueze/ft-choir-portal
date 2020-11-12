import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import AuthContainer from '../AuthContainer';
import UploadAccessModal from '../Modal';
import AddAccessModal from '../Modal';

import { getAccessList, deleteAccessById, flushAccessList, resetAccessData } from '../../_actions/authActions';
import UploadAccess from './UploadAccess';
import AddAccess from './AddAccess';

const AccessAdmin = ({loading, newAccess, getAccessList, deleteAccessById, flushAccessList, resetAccessData, accessList, newAccessUpload, updatedAccessList }) => {
  
  const [canUploadAccess, setCanUplaodAccess] = useState(false);
  const [canAddAccess, setCanAddAccess] = useState(false);

  useEffect(() => {
    getAccessList();
  }, [newAccessUpload, newAccess, updatedAccessList]);

  const handleFlushAccessList = () => {
    if (window.confirm('Are you sure!!')) {
      flushAccessList();
      resetAccessData();
    }
  };

  const handleDeleteAccess = id => {
    if (window.confirm('Are you sure!!')) {
      deleteAccessById(id)
      resetAccessData();
    }
  };

  return ( 
    <Fragment>
      <AuthContainer>
        <div className='dashboard-menu'>
            <span className='dashboard-menu-icon' onClick={() => setCanAddAccess(true)}> Add Access </span>
            <span className='dashboard-menu-icon' onClick={() => setCanUplaodAccess(true)}> Bulk upload </span>
            <span className='dashboard-menu-icon' onClick={() => handleFlushAccessList()}> Bulk Delete </span>
        </div>

        {
          canUploadAccess && (
            <UploadAccessModal visible={ canUploadAccess} closeModal={() => setCanUplaodAccess(false)}  >
              <UploadAccess closeModal={() => setCanUplaodAccess(false)} />
            </UploadAccessModal>
          )
        }

        {
          canAddAccess && (
            <AddAccessModal visible={ canAddAccess} closeModal={() => setCanAddAccess(false)}  >
              <AddAccess closeModal={() => setCanAddAccess(false)} />
            </AddAccessModal>
          )
        }
        <div className="">
          {
            accessList.length > 0 ? (

              <table className='table'>
                <thead>
                  <td>S/N</td>
                  <td>Access</td>
                  <td>STATUS</td>
                  <td>DELETE</td>
                </thead>
                <tbody>
                  {
                    accessList.map((item, idx) => {
              
                      const {_id, id, status } = item;
                      return (
                        <tr>
                          <td> { ++idx} </td>
                          <td> { id && id} </td>
                          <td> { status && status } </td>
                          <td> <span className='fa fa-close' onClick={() => handleDeleteAccess(_id)} /> </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>

            ) : <h1> No access </h1>
            
          }
        </div>
      </AuthContainer>   
    </Fragment>
  );
}
 

AccessAdmin.propTypes = {
  getAccessList: PropTypes.func.isRequired,
  deleteAccessById: PropTypes.func.isRequired,
  resetAccessData: PropTypes.func.isRequired,
  flushAccessList: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  accessList: state.auth.accessList,
  newAccessUpload: state.auth.newAccessUpload,
  newAccess: state.auth.newAccess,
  updatedAccessList: state.auth.updatedAccessList,
  loading: state.auth.loading,
  currentMember: state.auth.currentMember
});
export default connect(mapStateToProps, { getAccessList,deleteAccessById, flushAccessList, resetAccessData} )(AccessAdmin);
