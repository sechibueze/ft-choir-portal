import React, { Fragment } from 'react';
const ShowUnitInfo = ({ unitInfo }) => {
  const {group, rehearsal_location, vocal_part, membership_status, leadership_status, sub_group} = unitInfo;
  return ( 
    <Fragment>
      <section className="section">
            <header className="section-header">
              <h2 className="title"> Choir Role Data</h2>
            </header>
            <div className="data">
              <div className="data-field">
               <strong className="data-key"> Group </strong>
                <article className="data-value"> { group && group } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Rehearsal Location </strong>
                <article className="data-value"> { rehearsal_location && rehearsal_location } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key"> Part </strong>
                <article className="data-value"> { vocal_part && vocal_part } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Membership Status </strong>
                <article className="data-value"> { membership_status && membership_status } </article>
              </div> 
              <div className="data-field">
               <strong className="data-key">Leadership Status </strong>
                <article className="data-value"> { leadership_status && leadership_status } </article>
              </div>
              <div className="data-field">
               <strong className="data-key">Sub Group </strong>
                <article className="data-value"> { sub_group && sub_group } </article>
              </div>
                            
            </div>
            
            {/* {
              isProfileOwner(_id, member._id) &&
          <span onClick={() => setChoirRoleVisibility(true)} className='btn btn-sm btn-primary fa fa-edit'> &nbsp;Choir roles</span>
            } */}
          </section>
    </Fragment>
   );
}
 
export default ShowUnitInfo;