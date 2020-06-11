import React, { Fragment } from 'react';

const ShowMemberImage = ({ imageUrl}) => {
  return ( 
    <Fragment>
      {
        <img 
          src={imageUrl} 
          alt='member view' 
          className=''
          style={{ width: '100px', 
            height: '100px', 
            margin: 'auto',
            textAlign: 'center',
            display: 'block'
          }}
        />
      }
    </Fragment>

   );
}
 
export default ShowMemberImage;