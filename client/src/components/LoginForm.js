import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

function LoginForm() {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup.string().required("Must enter an email"),
    password: yup.string().required("Must enter a password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: () => {
      console.log("fetching");
      fetch("/users")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Something went wrong");
        })
        .then((data) => {
          data.forEach((currentUser) => {
            if (
              currentUser.password === formik.values.password &&
              currentUser.email === formik.values.email
            ) {
              navigate(`/main`, {
                state: { currentUser },
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <div className="login">
      <form onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className="input-group">
            <input
              id="password"
              name="password"
              placeholder="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <p className="error">{formik.errors.password}</p>
            )}
          </div>
          <p> {formik.errors.position}</p>
          <div className="button-container">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
