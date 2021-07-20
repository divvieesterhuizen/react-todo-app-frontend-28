import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-danger text-center mt-5 py-1 pt-3'>
      <ul className='list-inline'>
        <li className='list-inline-item'>
          <Link className='text-white' to='/'>
            Home
          </Link>
        </li>
        <li className='list-inline-item'>
          <Link className='text-white' to='/about'>
            About
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
