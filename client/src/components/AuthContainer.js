import React, { Fragment} from 'react';
import AuthNavbar from './AuthNavbar';
import AuthSidebar from './AuthSidebar';
const AuthContainer = ({ children }) => {
  return (
    <Fragment>
      <AuthSidebar />
      <div class='dashboard-main'>
        <AuthNavbar />
        <div class="container90">
          { children }
        </div>          
      </div>
    </Fragment>
  );
}
 
export default AuthContainer;