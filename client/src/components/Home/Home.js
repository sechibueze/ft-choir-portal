import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="bgHome">
        <div className="container">
          <div className="buttons py-5">
            <Link to="/auth" className="btn btn-md btn-dark mr-1 fa fa-users fa-2x"> &nbsp;&nbsp;Signup</Link>
            <Link to="/login" className="btn btn-md btn-success ml-1 fa fa-sign-in fa-2x"> &nbsp;&nbsp; Login</Link>
          </div>
        </div>
      </div>

    </Fragment>
  );
}
 
export default Home;