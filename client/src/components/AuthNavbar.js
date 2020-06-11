import React, { Fragment} from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../_actions/authActions';

const AuthNavbar = ({ logout}) => {
  return ( 
    <Fragment>
      <div class="dashboard-navbar">
        <div class="dashboard-navbar-links clearfix">
          {/* <a href="./login.html"><i class="fa fa-microphone"></i> Informate</a>
          <a href="./login.html"><i class="fa fa-cog"></i> Settings</a> */}
          <span onClick={() => logout()}><i class="fa fa-sign-out" /> Logout</span>
        </div>
      </div>
    </Fragment>
   );
}


AuthNavbar.propTypes = {
  logout: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { logout })(AuthNavbar);
 
