import classNames from "classnames";
import React from "react";
import HeaderSearch from "../header-search/HeaderSearch";
import Toggle from "../sidebar/Toggle";
import ChatDropdown from "./dropdown/chat/Chat";
import Notification from "./dropdown/notification/Notification";
import User from "./dropdown/user/User";

import Logo from "../logo/Logo";
import { useTheme, useThemeUpdate } from "../provider/Theme";

const Header = ({ fixed, className, ...props }) => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();

  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme.header === "white",
    [`is-${theme.header}`]: theme.header !== "white" && theme.header !== "light",
    [`${className}`]: className,
  });
  return (
    <div className={headerClass}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ms-n1">
            <Toggle
              className="nk-nav-toggle nk-quick-nav-icon d-xl-none ms-n1"
              icon="menu"
              click={themeUpdate.sidebarVisibility}
            />
          </div>
          <div className="nk-header-brand d-xl-none">
          <h1>λxtra</h1>
          </div>
          <div className="nk-header-search ms-3 ms-xl-0">
            <HeaderSearch />
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              {/* <li className="chats-dropdown hide-mb-xs">
                <ChatDropdown />
              </li> */}
              {/* <li className="notification-dropdown me-n1">
                <Notification />
              </li> */}
              <li className="user-dropdown">
                <User />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
