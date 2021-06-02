import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebarContainer">
        <div className="head">
          <h1>Dashboard</h1>
        </div>
        <div className="links">
          <div className="link" activeClassName='active' >
            <NavLink className='a' exact to="/">Data Table</NavLink>
          </div>
          <div className="link"  activeClassName='active' >
            <NavLink className='a' exact to="/viz">Charts</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
