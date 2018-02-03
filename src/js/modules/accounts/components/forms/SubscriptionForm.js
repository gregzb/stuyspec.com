import React from "react";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";
import { EMAIL_REGEX } from "../../../../constants";

import FormStatus from "./FormStatus";

const styles = {
  form: {
    display: "flex",
  },
  submitButton: {
    backgroundColor: "#e2130b",
    border: "none",
    borderRadius: "3px",
    color: "#fff",
    fontFamily: "Circular Std",
    fontSize: "15px",
    fontWeight: "300",
    padding: "11px",
    margin: "9px 0 21px 0",
    width: "275px",
    "&:disabled": {
      background: "#ddd",
      borderColor: "#ddd",
      color: "#888",
    },
  },
  email: {
    backgroundColor: "#eee",
    border: "none",
    borderRadius: "3px",
    fontFamily: "Circular Std",
    fontSize: "15px",
    fontWeight: "300",
    padding: "11px",
    width: "275px",
  },
  syncValidation: {
    color: "red",
    margin: 0,
    marginTop: "10px",
  },
};

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "No email detected";
  } else if (!EMAIL_REGEX.test(formValues.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  classes,
  meta: { touched, error, warning },
}) => {
  return (
    <div>
      <div>
        <input
          {...input}
          placeholder={label}
          type={type}
          className={classes.email}
        />
        {touched &&
          (error && (
            <p className={classes.syncValidation}>
              {error}
            </p>
          ))}
      </div>
    </div>
  );
};

const SubscriptionForm = ({
  classes,
  handleSubmit,
  submitting,
  callToAction,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Enter your e-mail address."
          classes={classes}
        />
        <div>
          <button
            type="submit"
            disabled={submitting}
            className={classes.submitButton}
          >
            {callToAction ? callToAction : "Subscribe"}
          </button>
        </div>
      </form>
      <FormStatus formName="subscription" />
    </div>
  );
};

export default compose(
  reduxForm({
    form: "subscription",
    validate
  }),
  injectSheet(styles),
)(SubscriptionForm);
