import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import AuthContainer from '../AuthContainer';
// import { loadCurrentMember } from '../../_actions/authActions';

const Dashboard = ({loading,  currentMember }) => {
  // 
  if(!currentMember) return <Loader />
  const { firstname
    // ,lastname, email, imageUrl 
  } = currentMember;
  return ( 
    <Fragment>
      <AuthContainer>
        <div className="">
            <h2 className="text-primary fa fa-user"> 
              &nbsp; { `Welcome ${firstname}`}
            </h2>
        </div>
     
       
      </AuthContainer>   
    </Fragment>
  );
}
 

Dashboard.propTypes = {
  loadCurrentMember: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  currentMember: state.auth.currentMember
});
export default connect(mapStateToProps )(Dashboard);
