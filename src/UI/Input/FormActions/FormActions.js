import React from "react";

import classes from './FormActions.module.css'

const FormActions = (props) => {
  return (
    <div>
      <div className={classes.formactions}>
        <button disabled={props.disabled}>
          {props.isLogin ? "Login" : "Create Account"}
        </button>
        <button type="button" onClick={props.switchAuthModeHandler}>
          {props.isLogin ? "Create new account" : "Login with existing account"}
        </button>
      </div>
    </div>
  );
};

export default FormActions;
