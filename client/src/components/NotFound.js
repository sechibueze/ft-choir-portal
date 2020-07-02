import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <Fragment>
      <h1 className='text text-dark'> 404 </h1>
      <h4> 
        <Link to='/'
        rel='noopener noreferrer'
        target='_blank'
      >Back to safety</Link></h4>
    </Fragment>
  );
}
 
export default NotFound;