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

const Register: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  let history = useHistory();
  const [input, setInput] = useState({ name: '', email: '', password: '', password2: '' });
  const [errors, setErrors] = useState<Errors>({});

  const onChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    setInput({...input, [id]: value});
  }

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    console.log('submitting')
    e.preventDefault();
    try {
      const data = await postData('http://localhost:8080/api/register', input);
      if (data.message === "success") {
        history.push("/");
        if (data.token) {
          dispatch({ type: "LOGIN", payload: data });
        }
      } else {
        console.log(data);
        setErrors(data);
      }
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
    <div className="Register">
      <div className="Register__card">
        <h2>Sign up</h2>
        <form noValidate onSubmit={onSubmit}>
          <div className="Register__input">
            <input
              onChange={onChange}
              id="name"
              type="text"
              placeholder="Username"
            />
            {errors.name && <div className="Register__error">{errors.name}</div>}
          </div>
          <div className="Register__input">
            <input
              onChange={onChange}
              id="email"
              type="text"
              placeholder="Email"
            />
            {errors.email && <div className="Register__error">{errors.email}</div>}
          </div>
          <div className="Register__input">
            <input
              onChange={onChange}
              id="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && <div className="Register__error">{errors.password}</div>}
          </div>
          <div className="Register__input">
            <input
              onChange={onChange}
              id="password2"
              type="password"
              placeholder="Confirm Password"
            />
            {errors.password2 && <div className="Register__error">{errors.password2}</div>}
          </div>
          <div className="Register__button">
            <input type="submit" value="Sign up" />
          </div>
        </form>
        <div className="Register__login">
          <div>or</div>
          <div><Link to="/">Login</Link></div>
        </div>
      </div>
    </div>
  );
}

export default Register;
