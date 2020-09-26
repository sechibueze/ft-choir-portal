import React, { Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { updateMemberImage } from '../../_actions/memberActions';
import Alert from '../Alert'
const EditMemberImage = ({ loading, imageUrl,
   memberImage, closeModal, updateMemberImage}) => {
  
  const [data, setData] = useState({ image: imageUrl ? imageUrl : ''})
  useEffect(() => {
    if(memberImage !== null) closeModal()
  }, [memberImage])

  const handleChange = ({ target}) => {
    setData(prev => ({
      ...prev,
      [target.name]:target.files[0]
    }))
  
  }
   const updateData = e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('image', data.image)
    updateMemberImage(fd)
  }
  return ( 
    <Fragment>
       <section className="section">
        <header className="section-header">
          <h3 className="title">
            Update Image 
          </h3>
        </header>
        <form className="form" onSubmit={updateData} encType="multipart/form-data">

          <Alert origin='MEMBER_IMAGE' />
          <div className="form-group">
            <small style={{ fontSize: '.8rem'}}> Ideal image dimension: 195px by 195px </small>
            <label htmlFor="image"> Upload your image</label>
            
            <input type="file" name="image" onChange={handleChange}  id="image" className="form-control"  />
          </div>

          <button type="submit" className="btn btn-sm btn-primary fa fa-check"> &nbsp;&nbsp; Update Image
            Data</button>
        </form>
      </section>
    </Fragment>
   );
}
 

EditMemberImage.propTypes = {
  updateMemberImage: PropTypes.func.isRequired
  // setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  imageUrl: state.auth.currentMember.imageUrl,
  memberImage: state.members.memberImage,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { updateMemberImage})(EditMemberImage);

