import React from "react";
import Button from "../../Button/Button";
import classes from './FormActions.module.css'

const FormActions = (props) => {
  return (
    <div>
      <div className={classes.formactions}>
        <Button disabled={props.disabled} type="submit">
          {props.isLogin ? "Login" : "Create Account"}
        </Button>
        <Button type="button" onClick={props.switchAuthModeHandler}>
          {props.isLogin ? "Create new account" : "Login with existing account"}
        </Button>
      </div>
    </div>
  );
};

export default FormActions;
