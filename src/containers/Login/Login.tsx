import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App/App';
import './Login.scss';

const Login: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const [input, setInput] = useState({ email: '', password: '' });

  const onChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    setInput({...input, [id]: value});
  }

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const data = await postData('http://localhost:8080/api/login', input);
      if (data.token) {
        dispatch({ type: "LOGIN", payload: data });
      }
      // JSON-string from `response.json()` call
      // localStorage.setItem('jwtToken', data.token)
      // // Set token to Auth header
      // setAuthToken(data.token);
      // // Decode token to get user data
      // const decoded = jwt_decode(data.token);
    } catch (error) {
      console.error(error);
    }
  }
  
  const postData = async (url = '', data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }

  return (
    <div className="Login">
      <h2>Log in</h2>
      <form noValidate onSubmit={onSubmit}>
        <div className="Login__input">
          <input
            onChange={onChange}
            id="email"
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="Login__input">
          <input
            onChange={onChange}
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="Login__input">
          <input type="submit" value="Log in" />
        </div>
      </form>
    </div>
  );
}

export default Login;
