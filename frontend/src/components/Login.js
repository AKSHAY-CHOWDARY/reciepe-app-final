import React from 'react';
import { useForm } from 'react-hook-form';
import { userLoginThunk } from '../redux/slices/userLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logincss from './CssFolder/Login.module.css';

function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { isPending, currentUser, errStatus, errMessage, loginStatus } = useSelector(state => state.userLogin); //userLogin because that is the slices we provided in the store.js
  let { register, handleSubmit } = useForm();

  //FORM SUBMIT
  function handleFormSubmit(data) {
    //call action creator function and get the actionObj
    const actionObj = userLoginThunk(data);
    //dispatch the action object to extra reducers
    dispatch(actionObj);
  }

  useEffect(() => {
    if (loginStatus === true) {
      navigate('/carousel');
    }
  }, [loginStatus]);

  return (
    <div className={Logincss.login}>
      <div className={Logincss.wrapper}>
        <form className='' onSubmit={handleSubmit(handleFormSubmit)}>
          <h1>Sign In</h1>
          {/* if login failed  */}
          {loginStatus === false ? (
            <p className={`${Logincss.textCenter} ${Logincss.textDanger}`}>{errMessage}</p>
          ) : (<></>)}
          <div className="input-box">
            <input type='text' className={`form-control mb-3 ${Logincss.input}`} placeholder='Username' {...register("username")} />
          </div>
          <div className="input-box">
            <input type='password' className={`form-control mb-3 ${Logincss.input}`} placeholder='password' {...register("password")} />
          </div>

          <div className={Logincss.rememberForgot}>
            <label>
              <input type="checkbox" name="remember" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type='submit' className={`mt-3 mb-3 pt-2 btn btn-success d-flex justify-content-center ${Logincss.button}`}>Login</button>
          <div className={Logincss.registerLink}>
            <p>
              Don't have an account?{" "}
              <Link to="/register" className={Logincss.href}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
