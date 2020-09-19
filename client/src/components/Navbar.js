import React, { Fragment} from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <Fragment>
      <nav className="navbar ">
    <div className="container clearfix">
      <input type="checkbox" id="menu-toggler-control" />
      <Link className="logo" to="/">
        <img src="/img/ftc-logo.png" className="logo-icon fa-connectdevelop fa-2x" />
        <div className="logo-name">FTC Portal</div>
      </Link>
      <label htmlFor="menu-toggler-control" className="menu-toggler fa fa-bars fa-2x"></label>
      <ul className="navlinks">
        {/* <li className="navlink-item"><Link to="/dashboard"> <i className="fa fa-dashboard"></i> Dashboard</Link></li>
        <li className="navlink-item"><Link to="/profile-edit"> <i className="fa fa-edit"></i> Manage Profile</Link></li>
        <li className="navlink-item"><Link to="/profile-info"> <i className="fa fa-microphone"></i> Profile Info</Link></li>
        <li className="navlink-item"><Link to="/member-list"> <i className="fa fa-users"></i> Members</Link></li> */}
        <li className="navlink-item"><Link to="/auth"> <i className="fa fa-users"></i> Signup</Link></li>
        <li className="navlink-item"><Link to="/login"><i className="fa fa-sign-in"></i>Login</Link></li>
      </ul>
    </div>
  </nav>
    </Fragment>
  );
}
 
export default Navbar;