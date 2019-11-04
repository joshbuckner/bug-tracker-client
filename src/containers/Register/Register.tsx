import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Register.scss';

const Register: React.FC = () => {
  let history = useHistory();
  const [input, setInput] = useState({ name: '', email: '', password: '', password2: '' });

  const onChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    setInput({...input, [id]: value});
  }

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const data = await postData('http://localhost:8080/api/register', input);
      if (data.message === "success") {
        history.push("/login");
      } else {
        console.log(data);
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
          </div>
          <div className="Register__input">
            <input
              onChange={onChange}
              id="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="Register__input">
            <input
              onChange={onChange}
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="Register__input">
            <input
              onChange={onChange}
              id="password2"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="Register__input">
            <input type="submit" value="Sign up" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
