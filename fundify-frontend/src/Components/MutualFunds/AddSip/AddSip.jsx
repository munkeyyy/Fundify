import { Formik } from "formik";
import React, { useContext, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { UserContext } from "../../../context/User/UserContext";
import axios from "axios";
import { notification } from "antd";
import { MdDeleteOutline } from "react-icons/md";

const AddSip = ({setIsModalOPen}) => {
  const [pictures, setPictures] = useState([]);
  const imgRef = useRef();
  const { user } = useContext(UserContext);
  const fileChange = (e, handleChange) => {
    const files = e.target.files;
    const newPictures = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const url = URL.createObjectURL(file);

      newPictures.push(url);
    }

    setPictures(newPictures);

    handleChange(e);
  };

  const handleDeleteImage = (index) => {
    const updatedPictures = [...pictures];
    updatedPictures.splice(index, 1);
    setPictures(updatedPictures);
  };
  return (
    <div>
      <div className=" md:p-4  flex items-start md:justify-center gap-4">
        <div className="md:mt-8">
          <div className="overflow-hidden w-full rounded-md md:border py-4 border border-[#2e2e2e]">
            <div>
              <Formik
                initialValues={{
                  name:"",
                  description:"",
                  returns:"",
                  category:"",
                  image:"",
                  riskLevel:"",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.name) {
                    errors.name = "name is Required";
                  } else if (values.name.length > 70) {
                    errors.name =
                      "name cannot exceed more than  70 characters";
                  }

                  if (!values.description) {
                    errors.description = "description is required";
                  } else if (values.description > 4096) {
                    errors.description =
                      "description cannot exceed more than  4096 characters";
                  }

                  if (!values.returns) {
                    errors.returns = "returns is required";
                  }

                  if (!values.category) {
                    errors.category = "category cannot be empty";
                  }
                  if (!values.riskLevel) {
                    errors.riskLevel = "risklevel cannot be empty";
                  }

                  if (!values.image) {
                    errors.image = "this field is mandatory";
                  }

                  return errors;
                }}
                onSubmit={(values) => {
                    // console.log(values)
                  try {
                    // console.log(values);
                    const formData = new FormData();
                    formData.append("name", values.name);
                    formData.append("description", values.description);
                    formData.append("category", values.category);
                    formData.append("returns", values.returns);

                    formData.append("riskLevel", values.riskLevel);
                    // console.log( "location",
                    // `${location?.neighbourhood}, ${location?.city}, ${location?.state}`)

                    formData.append("image",imgRef.current.files[0])

                    axios
                      .post(`http://localhost:8000/sips/add-sip`, formData, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      })
                      .then((res) => {
                        console.log(res.data.data);
                        setIsModalOPen(false)
                        notification.success({
                          message: res.data.message,
                        });
                   
                      })
                      .catch((err) => {
                        notification.error({
                          message: err,
                        });
                        console.log(err)
                      });
                  } catch (error) {
                    console.log(error);
                  }
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
                  <form onSubmit={handleSubmit}>
                    <div className=" border-b border-[#2e2e2e]">
                      <div className="w-full md:w-[600px] p-6">
                        <h2 className="text-lg font-bold text-white uppercase">
                          Include some deatils
                        </h2>
                        <div className="flex flex-col mt-3 gap-3">
                          <div className="flex flex-col gap-2 my-2">
                            <label className="text-white text-xs  font-medium">
                             Name*
                            </label>
                            <input
                              type="text"
                              name="name"
                              placeholder="Add name Here...."
                              autoComplete="off"
                              className="text-white border-[#2e2e2e] border px-2 py-3 rounded-md focus-visible:outline-none caret-[#0abb92] "
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                            />
                            <span className="text-red-600 text-[.8vw] text-center">
                              {errors.name && touched.name && errors.name}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 my-2">
                            <label className="text-white text-xs  font-medium">
                             Category*
                            </label>
                            <input
                              type="text"
                              name="category"
                              placeholder="Add category Here...."
                              autoComplete="off"
                              className="text-white border-[#2e2e2e] border px-2 py-3 rounded-md focus-visible:outline-none caret-[#0abb92] carat-"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.category}
                            />
                            <span className="text-red-600 text-[.8vw] text-center">
                              {errors.category && touched.category && errors.category}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 my-2">
                            <label className="text-white text-xs  font-medium">
                             Risk Level*
                            </label>
                            <input
                              type="text"
                              name="riskLevel"
                              placeholder="Add riskLevel Here...."
                              autoComplete="off"
                              className="text-white border-[#2e2e2e] border px-2 py-3 rounded-md focus-visible:outline-none caret-[#0abb92] carat-"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.riskLevel}
                            />
                            <span className="text-red-600 text-[.8vw] text-center">
                              {errors.riskLevel && touched.riskLevel && errors.riskLevel}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 my-2">
                            <label className="text-white text-xs  font-medium">
                              Description*
                            </label>
                            <input
                              type="text"
                              name="description"
                              placeholder="Enter a description"
                              className="border-[#2e2e2e] text-white border px-2 py-3 rounded-md focus-visible:outline-none caret-[#0abb92] carat-"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                            />
                            <span className="text-red-600 text-[.8vw] text-center">
                              {errors.description &&
                                touched.description &&
                                errors.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-b  border-[#2e2e2e]">
                      <div className="w-full md:w-[600px] p-6">
                        <h2 className="text-lg font-bold text-white uppercase">
                          Set Returns
                        </h2>
                        <div className="flex flex-col mt-3 gap-3">
                          <div className="flex flex-col gap-2 my-2">
                            <label className="text-white text-xs  font-medium">
                              Returns*
                            </label>
                            <div className="flex items-center  border border-[#2e2e2e] rounded py-3">
                              <div className="px-3 text-sm border-r  border-[#2e2e2e] text-gray-400">
                                %
                              </div>
                              <input
                                type="text"
                                name="returns"
                                placeholder="Add returns"
                                autoComplete="off"
                                className=" text-white border-none px-2 w-full bg-transparent rounded-md focus-visible:outline-none caret-[#0abb92] carat-"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.returns}
                              />
                            </div>
                            <span className="text-red-600 text-[.8vw] text-center">
                              {errors.returns && touched.returns && errors.returns}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border border-[#2e2e2e]">
                      <div className="w-full md:w-[600px] p-6">
                        <h2 className="text-lg font-bold text-white uppercase">
                          Upload Logo
                        </h2>
                        <div className="flex flex-wrap gap-4 mt-3">
                          {pictures.map((picture, index) => (
                            <div key={index} className="relative">
                              <div className="w-20 h-20 bg-transparent  border border-[#2e2e2e] flex justify-center items-center relative">
                                <img
                                  src={picture}
                                  alt={`Image ${index + 1}`}
                                  className="h-full object-cover w-full"
                                />
                                <button
                                  type="button"
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center -mt-1 -mr-1"
                                  onClick={() => handleDeleteImage(index)}
                                >
                                  <MdDeleteOutline />
                                </button>
                              </div>
                            </div>
                          ))}
                          {pictures.length < 12 && (
                            <label
                              htmlFor="image-upload"
                              className="relative cursor-pointer"
                            >
                              <div className="w-20 h-20 bg-tarnsparent  border border-[#2e2e2e] flex justify-center items-center">
                                <FaPlus className="text-[#2e2e2e] text-xl" />
                              </div>
                              <input
                                id="image-upload"
                                type="file"
                                name="image"
                                accept="image/*"
                                ref={imgRef}
                                className="hidden"
                                onChange={(e) => fileChange(e, handleChange)}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="my-4 flex justify-center px-6">
                      <button
                        type="submit"
                        className="py-2 transition-all duration-100 active:scale-[.95] flex items-center gap-2 font-semibold px-4  cursor-pointer text-white rounded-md mt-4 bg-[#02B386]"
                      >
                        ADD
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSip;
