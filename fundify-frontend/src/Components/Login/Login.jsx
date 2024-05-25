import React, { useRef, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import { notification } from "antd";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const passwordRef = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const navigate= useNavigate()
  return (
    <div className="bg-white">
      <div className="flex p-4 items-center justify-center flex-col">
        <h1 className="text-[#45475B] text-[1.3vw] font-bold">Welcome Back</h1>
        <div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email is Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.password) {
                errors.password = "Password is required";
              } else if (values.password.length < 8) {
                errors.password = "Password must be more than 8 cahracters";
              }
              return errors;
            }}
            onSubmit={(values) => {
              //   setTimeout(() => {
              //     alert(JSON.stringify(values, null, 2));
              //     setSubmitting(false);
              //   }, 400);
              axios
                .post(`http://localhost:8000/users/sign-in`, {
                  email: values.email,
                  password: values.password,
                })
                .then((res) => {
                  console.log(res.data);
                  notification.success({ message: res.data.message });
                  localStorage.setItem("token", res.data.token);
                  navigate("/")
                })
                .catch((err) => {
                  console.log(err);
                  notification.error({ message: err });
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form
                className="flex flex-col gap-4 mt-12"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-1 w-[20vw] items-center">
                  <label className="self-start" htmlFor="email">
                    Your Email*
                  </label>
                  <input
                    autoComplete="off"
                    type="email"
                    id="email"
                    className="bg-white  border-b w-full border-[#7B7E8C] transition-all active:outline-none visited::outline-none focus:border-b-2 focus:outline-none focus-visible:border-b-2 focus-visible:border-[#02B386] focus-visible:outline-none text-black"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <span className="text-red-600">
                    {errors.email && touched.email && errors.email}
                  </span>
                </div>
                <div className="flex flex-col gap-1 w-[20vw] relative items-center">
                  <label className="self-start" htmlFor="password">
                    Enter Password*
                  </label>
                  <input
                    ref={passwordRef}
                    type="password"
                    id="password"
                    name="password"
                    className="bg-white border-b w-full border-[#7B7E8C] transition-all focus-visible:border-b-2 focus-visible:border-[#02B386] focus-visible:outline-none text-black"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <span className="text-red-600">
                    {errors.password && touched.password && errors.password}
                  </span>
                  <button
                    onClick={() => {
                      setIsClicked(!isClicked);
                      passwordRef.current.type = `${
                        isClicked ? "text" : "password"
                      }`;
                    }}
                    type="button"
                    className="text-lg absolute top-[40%] right-0 "
                  >
                    {isClicked ? <IoMdEyeOff /> : <IoEye />}
                  </button>
                </div>
                <button
                  className="py-2 font-semibold px-4 w-full cursor-pointer text-white rounded-md mt-4 bg-[#02B386]"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
