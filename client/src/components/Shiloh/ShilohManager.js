import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContainer from '../AuthContainer';
import { getShilohRegistration, generateShilohRegistrationReport, deleteShilohRegistrationById } from '../../_actions/shilohActions';
const ShilohManager = ({loading, getShilohRegistration, generateShilohRegistrationReport, deleteShilohRegistrationById, shilohReportUrl, newAttendee, updatedAttendee, shilohList}) => {
  
  useEffect(getShilohRegistration, [ newAttendee, updatedAttendee]);
  const handleDelete = (accessId) => {
    if (window.confirm("Are you sure ?" )) {
      deleteShilohRegistrationById(accessId);
    }
  }

  if(loading) return <h1> Loading ...</h1>
  return ( 
    <AuthContainer>
      {
        shilohList.length > 0 ? (
          <Fragment>
            <div className="context-box">
              {
                !shilohReportUrl ? 
                (<span onClick={() => generateShilohRegistrationReport()} className="btn btn-primary m-1 p-1"> {loading ? 'wait...' : 'Get report'} </span>) :
                (<a target="_blank" href={ shilohReportUrl } className="btn btn-primary m-1 p-1">Download Report </a>)
              }
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th> S/N </th>
                  <th> Firstname </th>
                  <th> Lastname </th>
                  <th> Email </th>
                  <th> Access ID </th>
                  <th> OTP </th>
                  <th> Phone </th>
                  <th> Gender </th>
                  <th> Accomodation </th>
                  <th> Availability </th>
                  <th> Delete </th>
                </tr>
              </thead>
              <tbody>

                {
                  shilohList.map((attendee, idx) => {
                    // "FTCHR5432" Tosin Emmanuel Adeleke
                    // "FTCHR5432" 
                    // "FTCHR0498"
                    // "FTCHR0498"

                    // "FTCHR5980"
                    // "FTCHR4956"
                    // "FTCHR1541"
                    // "FTCHR4353"
                    // "FTCHR1136"
                   
                    if (!attendee.profile || !attendee.member) {
                      console.log('A without profile or member', attendee)
                    }else{

                      const {accessId, otp, profile: {phone, gender, unit_info: { vocal_part, group}}, accomodation, availability, member: { firstname, lastname, email} } = attendee;
                      return (
                        <tr key={idx}>
                        <td> { ++idx } </td>
                        <td> { firstname && firstname} </td>
                        <td> { lastname && lastname} </td>
                        <td> { email && email} </td>
                        <td> { accessId && accessId} </td>
                        <td> { otp && otp} </td>
                        <td> { phone && phone} </td>
                        <td> { gender && gender} </td>
                        <td> { accomodation && accomodation} </td>
                        <td> { availability && availability.join(',')} </td>
                        <td> <span onClick={() => handleDelete(accessId)} className="fa fa-times"/> </td>
                      </tr>
                    )
                  }
                  })
                }
              </tbody>
            </table>
          </Fragment>
        ) : (<h1> No Attendee yet </h1>)
      }
    </AuthContainer>
   );
}

ShilohManager.propTypes = {
  getShilohRegistration: PropTypes.func.isRequired,
  deleteShilohRegistrationById: PropTypes.func.isRequired,
  generateShilohRegistrationReport: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  newAttendee: state.shiloh.newAttendee,
  updatedAttendee: state.shiloh.updatedAttendee,
  shilohReportUrl: state.shiloh.shilohReportUrl,
  shilohList: state.shiloh.shilohList,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { getShilohRegistration,generateShilohRegistrationReport, deleteShilohRegistrationById })(ShilohManager);
