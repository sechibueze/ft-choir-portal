import React, { Fragment } from 'react';
import formatDate from '../formatDate';

const ShowChurchInfo = ({ churchInfo }) => {

  const { wsf_status, province, district, zone, ordination_year, 
    lfc_joined_year, holy_spirit_year, new_birth_year} = churchInfo;
  return ( 
    <Fragment>
       <section className="section">
            <header className="section-header">
              <h2 className="title"> Church  Data</h2>
            </header>
            <div className="data">
              <div className="data-field">
               <strong className="data-key">WSF Status </strong>
                <article className="data-value"> { wsf_status && wsf_status} </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">New birth year </strong>
                <article className="data-value"> { new_birth_year && formatDate(new_birth_year)} </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Holy Spirit year </strong>
                <article className="data-value"> { holy_spirit_year && 
                 formatDate(holy_spirit_year)
                } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Date  Joined LFC </strong>
               <article className="data-value"> { lfc_joined_year && 
                formatDate(lfc_joined_year)
                } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Ordination year </strong>
               <article className="data-value"> { ordination_year && 
                formatDate(ordination_year)
                } </article>
              </div> 
        
              <div className="data-field">
               <strong className="data-key">Province</strong>
                <article className="data-value"> { province && province } </article>
              </div> 
                
              <div className="data-field">
               <strong className="data-key"> District </strong>
                <article className="data-value"> { district && district } </article>
              </div> 
                
              <div className="data-field">
               <strong className="data-key"> Zone </strong>
                <article className="data-value"> { zone && zone } </article>
              </div> 
              
                            
            </div>
            {/* {
              isProfileOwner(_id, member._id) &&
          <span onClick={() => setChurchInfoVisibility(true)} className='btn btn-sm btn-primary fa fa-edit'> &nbsp;Church Info</span>
            } */}
            
          </section>
    </Fragment>
   );
}
 
export default ShowChurchInfo;