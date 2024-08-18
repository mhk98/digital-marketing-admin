import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { default as Logo, default as LogoDark } from "../../images/logo-1.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";

const Register = () => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    setFile("");
    setImage("");

    reset({});
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("Name", data.name);
    formData.append("Email", data.email);
    formData.append("Password", data.passcode);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/signup",

        formData
      );

      if (response.data.status === "Success") {
        toast.success("Successfully Sign Up");
        setLoading(true);
        setTimeout(() => {
          navigate(`${process.env.PUBLIC_URL}/auth-success`);
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    reset(formData);
  }, [formData]);

  return (
    <>
      <Head title="Register" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
            {/* <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" /> */}
          <div><h1>λxtra</h1></div>

          </Link>
        </div>
        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Register</BlockTitle>
              <BlockDes>
                <p>Create New Account</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: true })}
                  placeholder="Enter your name"
                  className="form-control-lg form-control"
                />
                {errors.name && <p className="invalid">This field is required</p>}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="text"
                  bssize="lg"
                  name="email"
                  id="default-01"
                  {...register("email", { required: true })}
                  className="form-control-lg form-control"
                  placeholder="Enter your email address or username"
                />
                {errors.email && <p className="invalid">This field is required</p>}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={passState ? "text" : "password"}
                  id="password"
                  name="passcode"
                  {...register("passcode", { required: "This field is required" })}
                  placeholder="Enter your passcode"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                />
                {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
              </div>
            </div>

            <div className="form-group">
              <p className="form-label" htmlFor="category">
                Profile Image
              </p>
              <div className="form-control-wrap">
                <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange} />
                <img src={file} alt="" />
              </div>
            </div>

            <div className="form-group">
              <Button type="submit" color="primary" size="lg" className="btn-block">
                {loading ? <Spinner size="sm" color="light" /> : "Register"}
              </Button>
            </div>
          </form>
          <div className="form-note-s2 text-center pt-4">
            {" "}
            Already have an account?{" "}
            <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
              <strong>Sign in instead</strong>
            </Link>
          </div>
          {/* <div className="text-center pt-4 pb-3">
            <h6 className="overline-title overline-title-sap">
              <span>OR</span>
            </h6>
          </div>
          <ul className="nav justify-center gx-8">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#socials"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Facebook
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#socials"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Google
              </a>
            </li>
          </ul> */}
        </PreviewCard>
      </Block>
      <AuthFooter />
    </>
  );
};
export default Register;
