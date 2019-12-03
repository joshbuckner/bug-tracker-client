import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App/App';
import { Link } from "react-router-dom";
import './Login.scss';

interface Errors {
  email?: string
  password?: string
}

interface Data {
  email: string
  password: string
}

const Login: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const [input, setInput] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await postData('http://localhost:8080/api/login', input);
      if (data.token) {
        dispatch({ type: "LOGIN", payload: data });
      } else {
        setErrors(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const postData = async (url: RequestInfo, data: Data) => {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data)
    });
    return await response.json();
  }

  return (
    <div className="Login">
      <div className="Login__card">
        <h2>Log in</h2>
        <form noValidate onSubmit={onSubmit}>
          <div className="Login__input">
            <input
              onChange={e => setInput({...input, [e.target.id]: e.target.value})}
              id="email"
              type="text"
              placeholder="Email"
            />
            {errors.email && <div className="Login__error">{errors.email}</div>}
          </div>
          <div className="Login__input">
            <input
              onChange={e => setInput({...input, [e.target.id]: e.target.value})}
              id="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && <div className="Login__error">{errors.password}</div>}
          </div>
          <div className="Login__button">
            <input type="submit" value="Log in" />
          </div>
        </form>
        <div className="Login__register">
          <div>or</div>
          <div>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
