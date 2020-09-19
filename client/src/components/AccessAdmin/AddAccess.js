import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../Alert';
import { addAccess } from '../../_actions/authActions';
import { STATUS } from '../constants';

const AddAccess = ({ closeModal, addAccess, newAccess }) => {
  const [data, setData] = useState({id: '', status: ''});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log('data ', data)
    addAccess(data);

  };

  useEffect(() => {
    if(newAccess !== null) return closeModal()
  }, [newAccess])

  const { id, status } = data;
  return ( 
    <Fragment>
       <form className='form' onSubmit={handleSubmit} >
        <Alert origin='ADD_ACCESS' />
        <div className='form-group'>
          <label htmlFor='id'> Access ID</label>
          <input type='text' name='id' value={id} pattern='^FTCHR[0-9]{4}' id='id' onChange={handleChange} className='form-control'/>
        </div>

        <div className='form-group'>
          <label htmlFor='status'> status </label>
          <select name='status' value={status} id='status' onChange={handleChange} className='form-control'>
            <option value='' selected> ---select---</option>
            {
              STATUS.map(status => {
                return <option value={status}> { status && status } </option>
              })
            }
          </select>
        </div>
        <button type='submit' className='btn btn-primary'> Add </button>
       </form>
    </Fragment>
   );
}
 
AddAccess.propTypes = {
  addAccess: PropTypes.func.isRequired,

};
const mapStateToProps = state => ({
  // accessList: state.auth.accessList,
  loading: state.auth.loading,
  newAccess: state.auth.newAccess
});
export default connect(mapStateToProps, { addAccess } )(AddAccess);

