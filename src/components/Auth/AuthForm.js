import React from "react";
import "./AuthForm.css";
import useInput from "../../hooks/use-input";
import Input from "../../UI/Input/Input";
import FormActions from "../../UI/Input/FormActions/FormActions";

const AuthForm = (props) => {

  const switchAuthModeHandler = () => {
    props.setIsLogin((prevState) => !prevState);
  };

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlureHandler: nameBlureHandler,
    reset: resetNameInput,
  } = useInput(props.isNotEmpty);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlureHandler: emailBlureHandler,
    reset: resetEmailInput,
  } = useInput(props.isEmail);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlureHandler: passwordBlureHandler,
    reset: resetPasswordInput,
  } = useInput(props.isPassword);

  const isTheSame = (value) => value === enteredPassword && value.trim() !== "";

  const {
    value: reEnteredPassword,
    isValid: reEnteredPasswordIsValid,
    hasError: reEnteredPasswordInputHasError,
    valueChangeHandler: reEnteredPasswordChangeHandler,
    inputBlureHandler: reEnteredPasswordBlureHandler,
    reset: resetReEnteredPasswordInput,
  } = useInput(isTheSame);

  const allIsValid =
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    reEnteredPasswordIsValid;

  const loginIsValid = enteredEmailIsValid && enteredPasswordIsValid;

  const resetValues = () => {
    resetNameInput();
    resetEmailInput();
    resetPasswordInput();
    resetReEnteredPasswordInput();
  };

  let formIsValid = false;

  if (!props.isLogin) {
    if (allIsValid) {
      formIsValid = true;
    }
  } else {
    if (loginIsValid) {
      formIsValid = true;
    }
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetValues();

    props.setIsLoading(true);
    let url;
    if (props.isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsJgNrox24sxPJLVDa_0hTtU5iem_ZvN4";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsJgNrox24sxPJLVDa_0hTtU5iem_ZvN4";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        displayName: enteredName,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        props.setIsLoading(false);

        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            //show an error modal
            console.log(data);

            let errorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        props.authCtx.login(data.idToken, expirationTime.toISOString());
        props.modalCtx.onShowModal();

        props.history.replace("/");
        localStorage.setItem("uname", data.displayName);
      })

      .catch((err) => {
        alert(err.message);
      });
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  const reEnteredPasswordInputClasses = reEnteredPasswordInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <React.Fragment>
      <h1>{props.isLogin ? "Login" : "Sign Up"}</h1>
      <form className="app" onSubmit={formSubmissionHandler}>
        {!props.isLogin && (
          <Input
            nameClasses={nameInputClasses}
            error={nameInputHasError}
            id="name"
            label="Name"
            type="text"
            onChange={nameChangeHandler}
            onBlur={nameBlureHandler}
            value={enteredName}
            errormsg="name must not be empty"
          />
        )}

        <Input
          nameClasses={emailInputClasses}
          error={emailInputHasError}
          id="email"
          label="Email"
          type="email"
          onChange={emailChangeHandler}
          onBlur={emailBlureHandler}
          value={enteredEmail}
          errormsg="Please enter a valid email"
        />
        <Input
          nameClasses={passwordInputClasses}
          error={passwordInputHasError}
          id="password"
          label="Password"
          type="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlureHandler}
          value={enteredPassword}
          errormsg="Password must be greater than 8 characters with 
            acombination of characters and numbers."
        />

        {!props.isLogin && (
          <Input
            nameClasses={reEnteredPasswordInputClasses}
            error={reEnteredPasswordInputHasError}
            id="password"
            label="reEnteredpassword"
            type="password"
            onChange={reEnteredPasswordChangeHandler}
            onBlur={reEnteredPasswordBlureHandler}
            value={reEnteredPassword}
            errormsg="passwords must match"
          />
        )}
        {props.isLoading && <p>Sending request....</p>}
        <FormActions
          disabled={!formIsValid}
          isLogin={props.isLogin}
          switchAuthModeHandler={switchAuthModeHandler}
        ></FormActions>
      </form>
    </React.Fragment>
  );
};

export default AuthForm;
