import React from 'react';

function Header() {
  return (
    <header className='App-header'>
      <a className='App-link-header' href='http://localhost:3000/'>
        Home
      </a>
      <a
        className='App-link-header'
        href='http://localhost:4000/auth/github'
        target='_blank'
        rel='noopener noreferrer'
      >
        Sign in w/ Github
      </a>
    </header>
  );
}

export default Header;
