import React from 'react';

function Header({ hasUser, handleLogin, handleLogout }) {
  return (
    <header className='App-header'>
      <a className='App-link-header' href='http://localhost:3000/'>
        Home
      </a>
      <a
        className='App-link-header'
        onClick={hasUser ? handleLogout : handleLogin}
        target='_blank'
        rel='noopener noreferrer'
      >
        {hasUser ? 'Logout' : 'Sign in w/ Github'}
      </a>
    </header>
  );
}

export default Header;
