import React, { Fragment } from 'react';
import formatDate from '../formatDate';
const ShowPersonalInfo = ({ personal }) => {
  const { 
    title, gender,
    phone, whatsapp_phone, contact_address,pha,
    dob,wed_date, work_status, profession, employer_name,
    employer_address, state_origin, nationality} = personal;
  return ( 
    <Fragment>
       <section className="section">
            <header className="section-header">
              <h2 className="title"> Personal Data</h2>
            </header>
            <div className="data">
              <div className="data-field">
               <strong className="data-key">Title</strong>
                <article className="data-value"> {  title &&  title } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Gender</strong>
                <article className="data-value"> {  gender &&  gender } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Phone</strong>
                <article className="data-value"> {  phone &&  phone } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Whatsapp Phone</strong>
                <article className="data-value"> {  whatsapp_phone &&  whatsapp_phone } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Contact Address</strong>
                <article className="data-value"> { contact_address && contact_address} </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Permanent Home Address</strong>
                <article className="data-value"> {pha && pha} </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Date of Birth</strong>
                <article className="data-value"> {dob && formatDate(dob)} </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Wedding date</strong>
                <article className="data-value"> { wed_date && formatDate(wed_date) } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Work Status</strong>
                <article className="data-value"> { work_status && work_status } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Profession</strong>
                <article className="data-value"> { profession && profession } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Employer name</strong>
                <article className="data-value"> { employer_name && employer_name } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Employer Address</strong>
                <article className="data-value"> {  employer_address &&  employer_address } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">State of Origin</strong>
                <article className="data-value"> {  state_origin &&  state_origin } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Nationality</strong>
                <article className="data-value"> {  nationality &&  nationality } </article>
              </div> 
              
            </div>
            {/* {
              isProfileOwner(_id, member._id) &&

              <span onClick={() => setPersonalVisibility(true)} className='btn btn-sm btn-primary fa fa-edit'> &nbsp;PersonalData</span>
            } */}
            
          </section>
    </Fragment>
   );
}
 
export default ShowPersonalInfo;