import React from 'react';
import Homecss from './CssFolder/Home.module.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className={Homecss.home}>
      <section className={Homecss.container}>
        <h1 className={Homecss.title}>
          <span>Welcome</span>
          <span>To</span>
          <span>FoodHUNT</span>
        </h1>
        <h2 className={Homecss.title}>
          <span>Eat,</span>
          <span>Love,</span>
          <span>Share</span>
        </h2>
      </section>
      <div className={`${Homecss.buttonss} w-50 mx-auto mt-5`}>
        <Link to="register" className={Homecss['btn-53']}>
          <div className={Homecss.original}>SignUp</div>
          <div className={Homecss.letters}>
            <span>S</span>
            <span>i</span>
            <span>g</span>
            <span>n</span>
            <span>U</span>
            <span>p</span>
          </div>
        </Link>
        <Link to="login" className={Homecss['btn-53']}>
          <div className={Homecss.original}>Login</div>
          <div className={Homecss.letters}>
            <span>L</span>
            <span>O</span>
            <span>G</span>
            <span>I</span>
            <span>N</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
