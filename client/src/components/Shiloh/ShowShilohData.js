import React,  { Fragment } from 'react';
import Alert from '../Alert';
import { GET_SHILOH_DATA, SHILOH_SIGNUP } from '../../_actions/types';
const ShowShilohData = ({ shilohData}) => {

  const { member: { firstname, lastname, accessId, email }, availability, accomodation, otp } = shilohData;

  return ( 
      <Fragment>


        <section className="section">
          <header className="section-header">
            <h2 className="title"> Shiloh Registration Data</h2>
          </header>
          <Alert origin={GET_SHILOH_DATA} />
          <Alert origin={SHILOH_SIGNUP} />
          
          <div className="data">
            
            <div className="data-field">
              <span className="data-key"> Access ID </span>
              <article className="data-value"> { accessId && accessId} </article>
            </div>
            <div className="data-field">
              <span className="data-key">Firstname </span>
              <article className="data-value"> { firstname && firstname} </article>
            </div>
            
            <div className="data-field">
              <span className="data-key">Lastname </span>
              <article className="data-value"> { lastname && lastname} </article>
            </div>
            <div className="data-field">
              <span className="data-key">Email </span>
              <article className="data-value"> { email && email} </article>
            </div>
            <div className="data-field">
              <span className="data-key">Availability </span>
              <article className="data-value"> { availability && availability.join()} </article>
            </div>
            <div className="data-field">
              <span className="data-key">Accomodation </span>
              <article className="data-value"> { accomodation && accomodation} </article>
            </div>
            <div className="data-field">
              <span className="data-key">OTP </span>
              <article className="data-value"> { otp && otp} </article>
            </div>
          </div>
        </section>
      </Fragment>
   );
}
 
export default ShowShilohData;