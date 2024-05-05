import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

import RegisterCss from './CssFolder/Register.module.css';

function Register() {
  let { register, handleSubmit } = useForm();
  let [err, setErr] = useState('');
  let navigate = useNavigate();

  //FORM SUBMIT
  async function handleFormSubmit(userObj) {
    let res = await axios.post('http://localhost:2000/user-api/user', userObj);
    if (res.data.message === 'User created') {
      //NAVIGATE TO SIGN IN COMPONENT
      navigate('/login');
    } else {
      setErr(res.data.message);
    }
  }

  return (
    <div className={RegisterCss.register}>
      <div className={RegisterCss.wrapper}>
        <form className='' onSubmit={handleSubmit(handleFormSubmit)}>
          <h1>Sign Up</h1>
          {/* USER REGISTER ERROR MESSAGE */}
          {err.length !== 0 && <p className={RegisterCss.error}>{err}</p>}
          <div className="input-box">
            <input type='text' className={`form-control mb-3 ${RegisterCss.input}`} required placeholder='Username' {...register("username")} />
          </div>
          <div className="input-box">
            <input type='password'  className={`form-control mb-3 ${RegisterCss.input}`} required placeholder='password' {...register("password")} />
          </div>
          <div className="input-box">
            <input type='email' className={`form-control mb-3 ${RegisterCss.input}`} required placeholder='email id' {...register("email")} />
          </div>
          <button type='submit' className={`btn btn-success d-flex justify-content-center ${RegisterCss.button}`}>Register</button>
          <div className={RegisterCss.registerLink}>
            <p>
              Already have an account?{" "}
              <Link to="/login" className={RegisterCss.link}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
