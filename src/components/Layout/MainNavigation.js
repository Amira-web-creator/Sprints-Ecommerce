import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const nameCtx = useContext(AuthContext);
  const uName = nameCtx.uName;

  const logOutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/home">amazon</NavLink>
      </div>
      <nav>
        <ul>
          {!isLoggedIn ? (
            <li>
              <NavLink activeClassName={classes.active} to="/auth">
                Login & Register
              </NavLink>
            </li>
          ) : (
            <NavLink activeClassName={classes.active} to="/profile">
              Welcome {uName}
            </NavLink>
          )}

          {isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/profile">
                Profile
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/cart">
                Cart
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logOutHandler}>Log out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
