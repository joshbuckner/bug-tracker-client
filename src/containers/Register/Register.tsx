import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App/App';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import './Register.scss';

interface Errors {
  name?: string
  email?: string
  password?: string
  password2?: string
}

interface Data {
  name: string
  email: string
  password: string
  password2: string
}

const Register: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  let history = useHistory();
  const [input, setInput] = useState({ name: '', email: '', password: '', password2: '' });
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await postData('http://localhost:8080/api/register', input);
      if (data.message === "success") {
        history.push("/");
        if (data.token) {
          dispatch({ type: "LOGIN", payload: data });
        }
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
    <div className="Register">
      <div className="Register__card">
        <h2>Sign up</h2>
        <form noValidate onSubmit={onSubmit}>
          <div className="Register__input">
            <input
              onChange={e => setInput({...input, [e.target.id]: e.target.value})}
              id="name"
              type="text"
              placeholder="Username"
            />
            {errors.name && <div className="Register__error">{errors.name}</div>}
          </div>
          <div className="Register__input">
            <input
              onChange={e => setInput({...input, [e.target.id]: e.target.value})}
              id="email"
              type="text"
              placeholder="Email"
            />
            {errors.email && <div className="Register__error">{errors.email}</div>}
          </div>
          <div className="Register__input">
            <input
              onChange={e => setInput({...input, [e.target.id]: e.target.value})}
              id="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && <div className="Register__error">{errors.password}</div>}
          </div>
          <div className="Register__input">
            <input
              onChange={e => setInput({...input, [e.target.id]: e.target.value})}
              id="password2"
              type="password"
              placeholder="Confirm Password"
            />
            {errors.password2 && <div className="Register__error">{errors.password2}</div>}
          </div>
          <div className="Register__button">
            <input 
              type="submit" 
              value="Sign up" 
            />
          </div>
        </form>
        <div className="Register__login">
          <div>or</div>
          <div>
            <Link to="/">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
