import React, { Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { updateNOKInfo } from '../../_actions/profileActions'
import { setAlert } from '../../_actions/alertActions';
import { TEXT_ONLY_PATTERN, PHONE_NUMBER_PATTERN, TEXT_WITH_SPACE } from '../constants';

const EditNOK = ({ nok, closeModal, setAlert, updatedNOKInfo, updateNOKInfo}) => {

  const [data, setData] = useState({
      nok_name: nok.nok_name? nok.nok_name : '',
      nok_address: nok.nok_address? nok.nok_address : '',
      nok_phone: nok.nok_phone? nok.nok_phone : '',
      nok_occupation: nok.nok_occupation? nok.nok_occupation : '',
      nok_relation: nok.nok_relation? nok.nok_relation : '',
      nok_email: nok.nok_email? nok.nok_email : ''
    })

  useEffect(() => { 
   if(updatedNOKInfo !== null ) closeModal()
  }, [updatedNOKInfo])
  
  const handleChange = ({ target}) => {
    setData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  
  }
   const updateData = e => {
    e.preventDefault();
    updateNOKInfo(data)
  }
  const {nok_name, nok_phone, nok_email, nok_address, nok_occupation } = data;

  return ( 
    <Fragment>
       <section className="section">
        <header className="section-header">
          <h3 className="title">
            Next of Kin Information
          </h3>
        </header>
        <form className="form" onSubmit={updateData}>

          <Alert origin='NOK_INFO_UPDATE' />
          <div className="form-group">
            <label htmlFor="nok_name"> Name of next of kin</label>
            <input type="text" pattern={TEXT_WITH_SPACE} name="nok_name" onChange={handleChange} value={nok_name} id="nok_name" className="form-control"  />
          </div>

          <div className="form-group">
            <label htmlFor="nok_address">Address of next of kin</label>
            <input type="text" name="nok_address" value={nok_address}  onChange={handleChange}  id="nok_address" className="form-control" 
               />
          </div>

          <div className="form-group">
            <label htmlFor="nok_phone">Phone number of next of kin</label>
            <input type="tel" pattern={PHONE_NUMBER_PATTERN} name="nok_phone" value={nok_phone}  onChange={handleChange}  id="nok_phone" className="form-control"  />
          </div>

          <div className="form-group">
            <label htmlFor="occupation">Occupation of next of kin</label>
            <input type="text" pattern={TEXT_WITH_SPACE} name="nok_occupation" value={nok_occupation}  onChange={handleChange}  id="occupation" className="form-control" 
               />
          </div>

          <div className="form-group">
            <label htmlFor="nok_email">Email of next of kin</label>
            <input type="email" name="nok_email" value={nok_email}  onChange={handleChange}  id="nok_email" className="form-control"  />
          </div>

          <div className="form-group">
            <label htmlFor="nok_relation">Relation to next of kin</label>
            <select name="nok_relation"  onChange={handleChange}  className="form-control" required>
              <option selected value=''>--select--</option>
              <option value="husband"> Husband</option>
              <option value="Son"> Son</option>
              <option value="Daughter"> Daughter</option>
              <option value="Spouse"> Spouse</option>
              <option value="Parent"> Parent</option>
              <option value="Sibling"> Sibling</option>
              <option value="Relative"> Mentor</option>
              <option value="Protege"> Protege</option>

            </select>
          </div>

          <button type="submit" className="btn btn-sm btn-primary fa fa-check"> &nbsp;&nbsp; Update Next of Kin
            Data</button>
        </form>
      </section>
    </Fragment>
   );
}
 
EditNOK.propTypes = {
  updateNOKInfo: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  updatedNOKInfo: state.profiles.updatedNOKInfo,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { setAlert, updateNOKInfo})(EditNOK);

