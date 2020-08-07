import React, { Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { updateAuthData } from '../../_actions/profileActions';
import { setAlert } from '../../_actions/alertActions';
import Alert from '../Alert';
import { TEXT_ONLY_PATTERN} from '../constants';

const EditAuthData = ({loading, authData, closeModal, setAlert, updateAuthData, updatedAuthData }) => {
  const [data, setData] = useState({
    firstname: authData.firstname ? authData.firstname : '',
    middlename: authData.middlename ? authData.middlename : '',
    lastname: authData.lastname ? authData.lastname : '',
    email: authData.email ? authData.email : '',
  })
  useEffect(() => { 
   if(updatedAuthData !== null ) closeModal()
  }, [updatedAuthData])
  
  const handleChange = ({ target}) => {
    setData(prev => ({
      ...prev,
      [target.name]:target.value
    }))
  }
   const updateData = e => {
    e.preventDefault();
  
    updateAuthData(data)
  }
 
  const {firstname, middlename, lastname, email} = data;
  return ( 
    <Fragment>
      <section className="section">
        <header className="section-header">
          <h3 className="title">
            Basic Authorization Data
          </h3>
        </header>
        <form onSubmit={updateData} className="form">
         <Alert origin='AUTH_DATA_UPDATE' />
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input type="text" pattern={TEXT_ONLY_PATTERN} value={firstname} onChange={handleChange} name="firstname" id="firstname"  className="form-control"  />
          </div>
          <div className="form-group">
            <label htmlFor="middlename">Middlename</label>
            <input type="text" pattern={TEXT_ONLY_PATTERN} name="middlename" value={middlename} onChange={handleChange}  id="middlename" className="form-control"
               />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname </label>
            <input type="text" pattern={TEXT_ONLY_PATTERN} name="lastname" value={lastname} onChange={handleChange}  id="lastname"  className="form-control"  />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email </label>
            <input type="email" name="email" value={email}  onChange={handleChange}  id="email" className="form-control"  />
          </div>

          <button type="submit" className="btn btn-sm btn-primary fa fa-check"> &nbsp;&nbsp; Update Authorization Data</button>
        </form>
      </section>
    </Fragment>
   );
}

EditAuthData.propTypes = {
  updateAuthData: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  updatedAuthData: state.profiles.updatedAuthData
});
export default connect(mapStateToProps, { setAlert, updateAuthData})(EditAuthData);

