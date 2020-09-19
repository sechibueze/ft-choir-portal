import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { uploadAccessList } from '../../_actions/authActions';

const UploadAccess = ({closeModal, uploadAccessList, newAccessUpload }) => {
  const [data, setData] = useState({allowlist: ''});

  const handleChange = ({ target }) => {
    const { name, files } = target;
    setData(prev => ({
      [name]: files[0]
    }))
  };
  const handleSubmit = e => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('allowlist', data.allowlist);
    uploadAccessList(fd);

  };

  useEffect(() => {
    if(newAccessUpload !== null) return closeModal()
  }, [newAccessUpload])


  return ( 
    <Fragment>
      <h1> upkoad Access </h1>
      <form className='form' onSubmit={handleSubmit} encType='multipart/form-data'>
        <Alert origin='UPLOAD_ACCESS_LIST' />
        <div className='form-group'>
          <label htmlFor='allowlist'> Upload Access List</label>
          <input type='file' name='allowlist' id='allowlist' onChange={handleChange} className='form-control'/>
        </div>
        <button type='submit' className='btn btn-primary'> Upload </button>
      </form>


    </Fragment>
   );
}
 

UploadAccess.propTypes = {
  // getAccessList: PropTypes.func.isRequired,
  uploadAccessList: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  // accessList: state.auth.accessList,
  loading: state.auth.loading,
  newAccessUpload: state.auth.newAccessUpload
});
export default connect(mapStateToProps, { uploadAccessList} )(UploadAccess);
