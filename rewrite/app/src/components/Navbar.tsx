import React from 'react';
import '../css/index.css';
import Button from './Button';
import Dropdown from './Dropdown';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-half">
        <div className="navbar-logo">
          accord
        </div>
        <Dropdown header='Yo' content="" />
      </div>
      <div className="navbar-half">
        <Button href='https://google.com' onclick={() => {}} text='Google' />
      </div>

    </div>
  );
}

export default Navbar;
