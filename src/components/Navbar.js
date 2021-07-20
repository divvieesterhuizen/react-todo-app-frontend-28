import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ title = 'React Todo App' }) => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-danger mb-5'>
      <div className='container col-sm-6'>
        <Link to='/'>
          <h1 className='text-white fs-2'>{title}</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
