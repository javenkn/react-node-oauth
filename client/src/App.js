import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './ components/Header';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('http://localhost:4000/auth/login/success', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    })
      .then(res => {
        if (res.status === 200) return res.json();
        throw new Error('Authentication failed.');
      })
      .then(data => {
        setUser(data.user);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='App'>
      <Header hasUser={!!user} setUser={setUser} />
      <img src={logo} className='App-logo' alt='logo' />
      <p style={{ color: 'white' }}>
        {!!user
          ? `Welcome ${user.username}`
          : `Edit ${<code>src/App.js</code>} and save to reload.`}
      </p>
      <a
        className='App-link'
        href='https://reactjs.org'
        target='_blank'
        rel='noopener noreferrer'
      >
        Learn React
      </a>
    </div>
  );
}

export default App;
