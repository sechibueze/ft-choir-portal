import React, { Fragment } from 'react';
import spinnerUrl from  './spinner.gif';
const Loader = ({ title }) => {
  return (
    <Fragment>
      
      <img 
        src={spinnerUrl}
        alt='Loading...'
        style={{
          display: 'block',
          margin: 'auto',
          width: '100px',
          textAlign: 'center'
        }}
      />
      { title ? <h2 style={{
          display: 'block',
          margin: 'auto',
          textAlign: 'center'
        }}> {title} </h2> : null }
    </Fragment>
  );
}
 
export default Loader;