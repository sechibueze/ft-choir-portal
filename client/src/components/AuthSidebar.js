import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
const AuthSidebar = ({ currentMember }) => {
  const adminLinks = (
      <Fragment>
        <li className="sidebar-linkitem">
          <Link to='/members'><span className="fa fa-users" />Members</Link>
        </li>
        <li className="sidebar-linkitem">
          <Link to='/post-admin'><span className="fa fa-edit" />Post Admin</Link>
        </li>

        <li className="sidebar-linkitem">
          <Link to='/access-admin'><span className="fa fa-key" />Access Admin</Link>
        </li>
        <li className="sidebar-linkitem">
          <Link to='/shiloh-manager'><span className="fa fa-cogs" />Shiloh Admin</Link>
        </li>
      </Fragment>
  );
  return (
    <Fragment>
      <input type="checkbox" id="sidebar-controller" />
      <label htmlFor="sidebar-controller" className="sidebar-menu-toggler fa fa-bars fa-2x"></label>
      <div className="sidebar">
        <label htmlFor="sidebar-controller" className="sidebar-close">X</label>
        
          <div className="header">
            <Link to='/' style={{color: 'white'}}>
              <img src="./img/ftc-logo.png" className="fa fa-connectdevelop auth-sidebar-logo" />
                &nbsp;&nbsp;
              FTC Portal
            </Link>
          </div>
       

        <ul className="sidebar-links">
          <li className="sidebar-linkitem">
            <Link to='/dashboard'><span className="fa fa-dashboard" />Dashboard</Link>
          </li>
          <li className="sidebar-linkitem">
            <Link to='/profile'><span className="fa fa-user" />Profiles</Link>
          </li>
          <li className="sidebar-linkitem">
            <Link to='/posts'><span className="fa fa-microphone" />Information</Link>
          </li>
          <li className="sidebar-linkitem">
            <Link to='/shiloh-attendee'><span className="fa fa-cog" />Shiloh</Link>
          </li>
          {
            currentMember.auth.includes('admin') ? adminLinks : null
          }          
        </ul>
      </div>
    </Fragment>
   );
}

AuthSidebar.propTypes = {

};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  currentMember: state.auth.currentMember,
});
export default connect(mapStateToProps)(AuthSidebar);


