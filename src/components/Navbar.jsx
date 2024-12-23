import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { loginTime } = useSelector((state) => state.auth);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSessionExpiration = () => {
      if (loginTime) {
        const elapsedTime = Date.now() - loginTime;

        if (elapsedTime > 24 * 60 * 60 * 1000) {
          dispatch({ type: "auth/logout" }); // Log the user out
        }
      }
    };
    checkSessionExpiration();
  }, [dispatch, loginTime]);

  const logoutUser = () => {
    dispatch({ type: "auth/logout" });
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">MacroBank</h1>
        {user && (
          <>
            <div className={`nav-menu ${isOpen ? "active" : ""}`}>
              <ul className="user-info">
                <li onClick={() => navigate("/account-detail")}>
                  <i className="bi bi-person-fill"></i>
                  {user && user?.username}.
                </li>
                <li>|</li>
                <li>
                  <i className="bi bi-chevron-down"></i>
                </li>
              </ul>
              <ul className="user-info">
                <li>
                  <i className="bi bi-envelope"></i>
                </li>
                <li>
                  <i className="bi bi-megaphone"></i>
                </li>
                <li onClick={logoutUser}>
                  Logout<i className="bi bi-arrow-bar-right"></i>
                </li>
              </ul>
            </div>
            <div
              className={`hamburger ${isOpen ? "toggle" : ""}`}
              onClick={toggleMenu}
            >
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
