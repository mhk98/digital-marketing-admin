import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList } from "../../../../components/links/Links";
import { useTheme, useThemeUpdate } from "../../../provider/Theme";

const User = () => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const image = localStorage.getItem("image");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate(`${process.env.PUBLIC_URL}/auth-login`);
  };

  // const shortName = name.substring(0, 2).toUpperCase();

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <img style={{ width: "40px" }} src={`http://localhost:5000/${image}`} className="sm" alt="" />
          <div className="user-info d-none d-md-block ms-2">
            <div className="user-status">Administrator</div>
            <div className="user-name dropdown-indicator">{name}</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <img style={{ width: "40px" }} src={`http://localhost:5000/${image}`} className="sm" alt="" />
            </div>
            <div className="user-info">
              <span className="lead-text">{name}</span>
              <span className="sub-text">{email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            {/* <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              Account Setting
            </LinkItem>
            <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem> */}
            {/* <li>
              <a
                className={`dark-switch ${theme.skin === "dark" ? "active" : ""}`}
                href="#"
                onClick={(ev) => {
                  ev.preventDefault();
                  themeUpdate.skin(theme.skin === "dark" ? "light" : "dark");
                }}
              >
                {theme.skin === "dark" ? (
                  <>
                    <em className="icon ni ni-sun"></em>
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <em className="icon ni ni-moon"></em>
                    <span>Dark Mode</span>
                  </>
                )}
              </a>
            </li> */}
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <Link to={`${process.env.PUBLIC_URL}/auth-login`} onClick={logout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </Link>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
