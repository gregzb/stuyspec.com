import React from "react";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";
import { EMAIL_REGEX } from "../../../../constants";

import FormStatus from "./FormStatus";

const styles = {
  SignUpForm: {
    fontFamily: "Minion Pro",
    maxWidth: "100%",
    "& form div": {
      // each Field
      marginBottom: "7px",
    },
  },
  submitButton: {
    backgroundColor: "#3472b7",
    border: "1px solid #3472b7",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "15px",
    fontStyle: "italic",
    height: "32px",
    marginTop: "10px",
    textAlign: "center",
    width: "70px",
    "&:disabled": {
      background: "#ddd",
      borderColor: "#ddd",
      color: "#888",
    },
  },
};

const validate = formValues => {
  const errors = {};
  if (!formValues.firstName) {
    errors.firstName = "Required";
  }
  if (!formValues.lastName) {
    errors.lastName = "Required";
  }
  if (!formValues.email) {
    errors.email = "Required";
  } else if (!EMAIL_REGEX.test(formValues.email)) {
    errors.email = "Invalid email address";
  }
  if (!formValues.password) {
    errors.password = "Required";
  } else if (formValues.password.length < 8) {
    errors.password = "Password is too short (minimum is 8 characters).";
  }
  if (formValues.password !== formValues.passwordConfirmation) {
    errors.passwordConfirmation =
      "Password and password confirmation do not match.";
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input
          style={{ width: "100%" }}
          {...input}
          placeholder={label}
          type={type}
        />
        {touched &&
          ((error && <span style={{ color: "red" }}>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

const SignUpForm = ({ classes, handleSubmit, submitting }) => {
  return (
    <div className={classes.SignUpForm}>
      <form onSubmit={handleSubmit}>
        <Field
          name="firstName"
          type="text"
          component={renderField}
          label="First Name"
        />
        <Field
          name="lastName"
          type="text"
          component={renderField}
          label="Last Name"
        />
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
        <Field
          name="passwordConfirmation"
          type="password"
          component={renderField}
          label="Password Confirmation"
        />
        <div>
          <button
            type="submit"
            disabled={submitting}
            className={classes.submitButton}
          >
            Sign Up
          </button>
        </div>
      </form>
      <FormStatus formName="signUp" redirect="/myaccount"/>
    </div>
  );
};

export default compose(
  reduxForm({
    form: "signUp",
    validate,
  }),
  injectSheet(styles),
)(SignUpForm);
