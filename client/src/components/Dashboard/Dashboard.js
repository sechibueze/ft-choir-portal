import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import AuthContainer from '../AuthContainer';
import PostFeeds from '../Posts/PostFeeds';
import ShowMemberImage from '../Profile/ShowMemberImage';
// import { loadCurrentMember } from '../../_actions/authActions';

const Dashboard = ({loading,  currentMember }) => {
  // 
  if(!currentMember) return <Loader />
  const { firstname, imageUrl ,lastname, // email, 
  } = currentMember;
  return ( 
    <Fragment>
      <AuthContainer>
        <div className="">
          <ShowMemberImage imageUrl={imageUrl} />
            <h2 className="text-primary" style={{textAlign: 'center', display: 'block', margin: 'auto'}}> 
              &nbsp; { `Welcome ${firstname} ${lastname}`}
            </h2>
        </div>

        <PostFeeds />
     
       
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
