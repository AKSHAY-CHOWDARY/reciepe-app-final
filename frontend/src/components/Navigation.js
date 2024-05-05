import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { resetState } from "../redux/slices/userLoginSlice";
import { Dropdown } from "react-bootstrap";
import NaviCss from "./CssFolder/Navigation.module.css";
import { PiCookingPotFill } from "react-icons/pi";

function Navigation() {
  const { loginStatus } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  function logout() {
    sessionStorage.removeItem("token");
    let actionObj = resetState();
    dispatch(actionObj);
  }

  return (
    <nav className={`navbar navbar-expand-lg ${NaviCss.nav}`}>

      <Link className="navbar-brand" to="/">
      <PiCookingPotFill size={'3rem'} style={{ color: 'orange' }} />

      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {loginStatus ? (
            <>
              <li className={`nav-item ${NaviCss.text}`}>
                <Link className="nav-link" to="/carousel" style={{ color: 'white' }}>
                  Home
                </Link>
              </li>
              <li className={`nav-item ${NaviCss.text}`}>
                <Link className="nav-link" to="add-reciepe" style={{ color: 'white' }}>
                  Create a recipe
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={`nav-item ${NaviCss.text}`}>
              <Link className={`nav-link ${NaviCss.text}`} to="/" style={{ color: 'white' }}>
                  Home
                </Link>
              </li>
              <li className={`nav-item ${NaviCss.text}`} >
                <Link className="nav-link" to="/register" style={{ color: 'white' }}>
                  Register
                </Link>
              </li>
              <li className={`nav-item ${NaviCss.text}`}>
                <Link className="nav-link" to="/login" style={{ color: 'white' }}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Aligning icons to the right */}
        <div className="ml-auto">
          {loginStatus && (
            <div className="d-flex">
              <form class="form d-flex m-3 my-2 my-lg-0">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  class="btn btn-outline-success mx-2 my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
              <ul className="navbar-nav mr-auto ">
              <li className={`nav-item ${NaviCss.text}`}>
                  <Link className="nav-link" to="reciepe-of-user" style={{ color: 'white' }}>
                    My Recipes
                  </Link>
                </li>
                <li className={`nav-item ${NaviCss.text}`}>
                  <Link className="nav-link" to="/favourites" style={{ color: 'white' }}>
                    Favorites
                  </Link>
                </li>
                <li className={`nav-item ${NaviCss.text}`}>
                  <Link className="nav-link" onClick={logout} style={{ color: 'white' }}>
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
