import React, { Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { WSF_STATUS } from '../constants';

import Alert from '../Alert'
import { setAlert } from '../../_actions/alertActions'
import { updateChurchInfo } from '../../_actions/profileActions';

const EditChurchInfo = ({loading, churchInfo, closeModal, updateChurchInfo, updatedChurchInfo }) => {
  const [data, setData] = useState({
      wsf_status: churchInfo.wsf_status ? churchInfo.wsf_status : '',
      new_birth_year: '',
      holy_spirit_year: '',
      ordination_year: '',
      province: churchInfo.province? churchInfo.province : '',
      district:churchInfo.district ? churchInfo.district : '',
      zone: churchInfo.zone ? churchInfo.zone : '',
      lfc_joined_year: ''
    })
  useEffect(() => { 
   if(updatedChurchInfo !== null ) closeModal()
  }, [updatedChurchInfo])
  
  const handleChange = ({ target}) => {
    setData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  }
   const updateData = e => {
    e.preventDefault();
    updateChurchInfo(data)
  }
          
  const { wsf_status, province, district, zone } = data;
 
  return ( 
    <Fragment>
      <section className="section">
        <header className="section-header">
          <h3 className="title">
            Church Information
          </h3>
        </header>
        <form className="form" onSubmit={updateData}>
          <Alert origin='CHURCH_INFO_UPDATE' />
          <div className="form-group">
            <label htmlFor="wsf_status">WSF status</label>
            <select name="wsf_status" onChange={handleChange} value={wsf_status} id="wsf_status" className="form-control" >
              <option selected value=''>--select--</option>
              {
                WSF_STATUS.map((status, idx) => (
                  <option value={status} key={idx}> { `${ status }` } </option>
                ))
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="new_birth_year">Year of new birth</label>
            <input type="date" name="new_birth_year"   onChange={handleChange}  id="new_birth_year" className="form-control"  />
          </div>

          <div className="form-group">
            <label htmlFor="holy_spirit_year">Year of Holy Ghost Baptism</label>
            <input type="date" name="holy_spirit_year" id="holy_spirit_year"  onChange={handleChange}   className="form-control"  />
          </div>
          <div className="form-group">
            <label htmlFor="lfc_joined_year">Year joined LFC</label>
            <input type="date" name="lfc_joined_year" onChange={handleChange} className="form-control"  />
          </div>

          <div className="form-group">
            <label htmlFor="ordination_year">Year of Ordination</label>
            <input type="date" name="ordination_year"   onChange={handleChange}  className="form-control"  />
          </div>

          <div className="form-group">
            <label htmlFor="province">Province</label>
            <input type="text" name="province" className="form-control" value={province}  onChange={handleChange}  />
          </div>

          <div className="form-group">
            <label htmlFor="district">District</label>
            <input type="text" name="district" className="form-control" value={district}  onChange={handleChange}  />

          </div>

          <div className="form-group">
            <label htmlFor="zone">
              Zone
            </label>
            <input type="text" name="zone" className="form-control" value={zone}  onChange={handleChange}  />
          </div>

          <button type="submit" className="btn btn-sm btn-primary fa fa-check"> &nbsp;&nbsp; Update Church Data</button>
        </form>
      </section>
    </Fragment>
   );
}

 
EditChurchInfo.propTypes = {
  updateChurchInfo: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  updatedChurchInfo: state.profiles.updatedChurchInfo,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { setAlert, updateChurchInfo})(EditChurchInfo);


