import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (

    <React.Fragment>
    <div className={props.nameClasses}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        value={props.value}
        type={props.type}
        id={props.id}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />
      {props.error && <p className={classes.errorText}>{props.errormsg}.</p>}
    </div>


   
    </React.Fragment>
  );
};

export default Input;
