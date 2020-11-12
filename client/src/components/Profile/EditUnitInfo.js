import React, { Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { updateUnitInfo } from '../../_actions/profileActions'
import { setAlert } from '../../_actions/alertActions';
import {VOCAL_PARTS, GROUPS, REHEARSAL_LOCATION, MEMBERSHIP_STATUS, LEADERSHIP_STATUS, SUB_GROUP} from '../constants';

const EditUnitInfo = ({ unitInfo, closeModal, setAlert, updateUnitInfo, updatedUnitInfo}) => {
  const [data, setData] = useState({
    group: unitInfo.group ? unitInfo.group : '', 
    rehearsal_location: unitInfo.rehearsal_location ? unitInfo.rehearsal_location : '', 
    vocal_part: unitInfo.vocal_part ? unitInfo.vocal_part : '', 
    membership_status: unitInfo.membership_status ? unitInfo.membership_status : '', 
    leadership_status: unitInfo.leadership_status ? unitInfo.leadership_status : '', 
    sub_group: unitInfo.sub_group ? unitInfo.sub_group : ''
    })
  useEffect(() => { 
    if(updatedUnitInfo !== null ) closeModal()
  }, [updatedUnitInfo])
  
  const handleChange = ({ target}) => {
    setData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  
  }
   const updateData = e => {
    e.preventDefault();
    updateUnitInfo(data)
  }
  // const {group, rehearsal_location, vocal_part, membership_status, leadership_status, sub_group } = data;
  return ( 
    <Fragment>
       <section className="section">
        <header className="section-header">
          <h3 className="title">
            Choir Roles
          </h3>
        </header>
        <form onSubmit={updateData} className="form">
          <Alert origin='UNIT_INFO_UPDATE'/>
          <div className="form-group">
            <label htmlFor="group"> Group</label>
            <select name="group"  onChange={handleChange} id="group" className="form-control" >
              <option selected value=''>--select--</option>
              {
                GROUPS.map((group, idx) => (
                  <option value={group} key={idx}> { `Group ${ group }` } </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="rehearsal_location">Rehearsal Location</label>
            <select name="rehearsal_location"  onChange={handleChange} id="rehearsal_location" className="form-control" >
              <option selected value=''>--select--</option>
              {
                REHEARSAL_LOCATION.map((location, idx) => (
                  <option value={location} key={idx}> { `${ location }` } </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="vocal_part">Part </label>
            <select name="vocal_part"  onChange={handleChange} id="vocal_part" className="form-control" >
              <option selected value=''>--select--</option>
              {
                VOCAL_PARTS.map((part, idx) => (
                  <option value={part} key={idx}> { `${ part }` } </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="membership_status">Membership status</label>
            <select name="membership_status"  onChange={handleChange} id="membership_status" className="form-control" >
              <option selected value=''>--select--</option>
              {
                MEMBERSHIP_STATUS.map((status, idx) => (
                  <option value={status} key={idx}> { `${ status }` } </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="leadership_status">Leadership status</label>
            <select name="leadership_status"  onChange={handleChange}  id="leadership_status" className="form-control" >
              <option selected value=''>--select--</option>
              {
                LEADERSHIP_STATUS.map((status, idx) => (
                  <option value={status} key={idx}> { `${ status }` } </option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label for="sub_group"> Sub group</label>
            <select name="sub_group"  onChange={handleChange}  id="sub_group" className="form-control" >
              <option selected value=''>--select--</option>
              {
                SUB_GROUP.map((group, idx) => (
                  <option value={group} key={idx}> { `${ group }` } </option>
                ))
              }
            </select>
          </div>
          <button type="submit" className="btn btn-sm btn-primary fa fa-check"> &nbsp;&nbsp; Update Choir Roles
            Data</button>
        </form>
      </section>
    </Fragment>
   );
}
 
EditUnitInfo.propTypes = {
  updateUnitInfo: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  updatedUnitInfo: state.profiles.updatedUnitInfo,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { setAlert, updateUnitInfo})(EditUnitInfo);

