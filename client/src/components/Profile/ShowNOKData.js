import React, { Fragment } from 'react';

const ShowNOKData = ({nok}) => {
  const { nok_name, nok_email, nok_address, nok_occupation, nok_phone, nok_relation} = nok;
  return ( 
    <Fragment>
      <section className="section">
            <header className="section-header">
              <h2 className="title"> Next of Kin Data</h2>
            </header>
            <div className="data">
              <div className="data-field">
               <strong className="data-key">Name </strong>
                <article className="data-value"> {nok_name && nok_name} </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Email </strong>
                <article className="data-value"> { nok_email && nok_email } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Phone </strong>
                <article className="data-value"> { nok_phone && nok_phone } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Address </strong>
                <article className="data-value"> { nok_address && nok_address } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Occupation </strong>
                <article className="data-value"> {  nok_occupation &&  nok_occupation } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Relation </strong>
                <article className="data-value"> {  nok_relation &&  nok_relation } </article>
              </div> 
                            
            </div>
            {/* {
              isProfileOwner(_id, member._id) &&
            <span onClick={() => setNokVisibility(true)} className='btn btn-sm btn-primary fa fa-edit'> &nbsp;Next of Kin</span>
            }
             */}
          </section>
    </Fragment>
   );
}
 
export default ShowNOKData;