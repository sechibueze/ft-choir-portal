import React, { Fragment } from 'react';

const ShowMemberImage = ({ imageUrl}) => {
  return ( 
    <Fragment>
      {
        <img 
          src={imageUrl} 
          alt='member view' 
          className='profile-image'         
        />
      }
    </Fragment>

   );
}
 
export default ShowMemberImage;