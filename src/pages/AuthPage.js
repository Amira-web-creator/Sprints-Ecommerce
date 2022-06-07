import React from "react";
import AuthForm from "../components/Auth/AuthForm";

const emailregx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passregx = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.toLowerCase().match(emailregx);
const isPassword = (value) => value.toLowerCase().match(passregx);

const AuthPage = () => {
  return (
    <AuthForm
      emailregex={emailregx}
      passregx={passregx}
      isNotEmpty={isNotEmpty}
      isEmail={isEmail}
      isPassword={isPassword}
    />
  );
};

export default AuthPage;
