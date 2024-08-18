import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "reactstrap";
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

const Login = () => {
  // const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const navigate = useNavigate();

  const onFormSubmit = async (formData) => {
    const data = {
      Email: formData.email,
      Password: formData.passcode,
    };

    console.log(data);
    try {
      const response = await axios.post("https://digital-agency-backend.onrender.com/api/v1/user/login", data);
console.log('login info', response.data.data);
      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.data.accessToken);
        localStorage.setItem("name", response.data.data.user.Name);
        localStorage.setItem("email", response.data.data.user.Email);
        localStorage.setItem("role", response.data.data.user.role);
        localStorage.setItem("image", response.data.data.user.image);
        toast.success("Successfully Logged In");
        navigate("/");
      }
      //  else {
      //   toast.success("Only allowed for admin");
      // }
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Head title="Login" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
            {/* <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" /> */}
          <div><h1>λxtra</h1></div>

          </Link>
        </div>

        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Sign-In</BlockTitle>
              <BlockDes>
                <p>Access Your Email and Password.</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>

          <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="default-01"
                  name="email"
                  {...register("email", { required: "This field is required" })}
                  placeholder="Enter your email address or username"
                  className="form-control-lg form-control"
                />
                {errors.email && <span className="invalid">{errors.email.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                {/* <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                  Forgot Password?
                </Link> */}
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
              <Button size="lg" className="btn-block" type="submit" color="primary">
                Login
              </Button>
            </div>
          </Form>
          <div className="form-note-s2 text-center pt-4">
            New on our platform? <Link to={`${process.env.PUBLIC_URL}/auth-register`}>Create an account</Link>
          </div>
          
        </PreviewCard>
      </Block>
      <AuthFooter />
    </>
  );
};
export default Login;
