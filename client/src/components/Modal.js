import React, { Fragment } from 'react';

const Modal = ({ children, visible, closeModal }) => {

  return (
    
    <Fragment>
    <div className={`modal ${visible ? 'visible' : ''}`}>

    <div className="modal-container">
      <span onClick={() => closeModal() } className="modal-close clearfix">X</span>
      <div className="modal-header">
        <h1 className="text-lead">FTC Portal </h1>
        <span className="text-info"></span>
      </div>
      <div className="modal-body">
    
      {children }    
      </div>
      <div className="modal-footer clearfix">
        {/* <button className="btn btn-sm btn-primary modal-btn-left">
          <i className="fa fa-sign-in"></i> &nbsp;&nbsp;
          Login
        </button>
        <button className="btn btn-sm btn-success modal-btn-right">
          <i className="fa fa-sign-out"></i>&nbsp;&nbsp;
          Logout
        </button> */}
      </div>
     
    </div>
  </div> 
      
    </Fragment>
  );
}
 
export default Modal;