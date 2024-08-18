import React from "react";
import { Link } from "react-router-dom";
import { default as LogoDark2x, default as LogoLight2x, default as LogoSmall } from "../../images/logo-1.png";

const Logo = () => {
  return (
    <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
      {/* <img className="logo-light logo-img" src={LogoLight2x} alt="logo" />
      <img className="logo-dark logo-img" src={LogoDark2x} alt="logo" />
      <img className="logo-small logo-img logo-img-small" src={LogoSmall} alt="logo" /> */}
      <h1>λxtra</h1>
    </Link>
  );
};

export default Logo;
