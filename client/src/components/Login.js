import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });
  
  const handleChange = e => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', userCredentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubblepage')
      })
      .catch(err => console.log('login post request error', err))
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input 
          name='username'
          placeholder='Username'
          value={userCredentials.username}
          onChange={handleChange}
          type='text'
        />
        <input 
          name='password'
          placeholder='Password'
          value={userCredentials.password}
          onChange={handleChange}
          type='password'
        />
        <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
