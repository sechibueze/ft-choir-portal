import React, { Fragment } from 'react';
const ShowAuthData = ({ member }) => {
  const { 
    // _id,
    firstname, middlename, lastname, email, accessId} = member;
  return ( 
    <Fragment>
       <section className="section">
            <header className="section-header">
              <h2 className="title"> Basic Authorization Data</h2>
            </header>
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
                <span className="data-key">Middlename </span>
                <article className="data-value"> { middlename && middlename} </article>
              </div>
              <div className="data-field">
                <span className="data-key">Lastname </span>
                <article className="data-value"> { lastname && lastname} </article>
              </div>
              <div className="data-field">
                <span className="data-key">Email </span>
                <article className="data-value"> { email && email} </article>
              </div>
            </div>
            
          {/* { isProfileOwner(_id, member._id ) && (
             <span onClick={() => setAuthVisibility(true)} className='btn btn-sm btn-primary fa fa-edit'> &nbsp;Statndard Data</span>
          )} */}
          </section>
    </Fragment>
   );
}
 
export default ShowAuthData;