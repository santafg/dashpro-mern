import React from "react";
import { MdMail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <div className="navContainer">
        <div className="logoDiv">
          <h1>Company</h1>
        </div>
        <div className="icons">
          <MdMail className='mail' />
          <FaUserAlt />
        </div>
      </div>
    </>
  );
};

export default Navbar;
