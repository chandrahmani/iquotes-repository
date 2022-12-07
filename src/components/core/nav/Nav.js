import { NavLink, useNavigate } from "react-router-dom";
import "App.css";
import { useAuthHook } from "hooks/useAuthHook";
import { Button, Lists, Navbar, Ul } from "components/styled";
import { Power } from "phosphor-react";
const Nav = () => {
  const history = useNavigate();

  const { isAuth, token } = useAuthHook();

  const handleClick = () => {
    localStorage.removeItem("token");
    history("/login");
  };

  return (
    <>
      <Navbar>
        <div>
          <Ul>
            <Lists>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </Lists>
            {!isAuth && (
              <Lists>
                <NavLink to="/contact" className="nav-link">
                  Contact Us
                </NavLink>
              </Lists>
            )}

            {isAuth && (
              <Lists className="nav-item">
                <NavLink to="/dashboard" className="nav-link">
                  Dashboard
                </NavLink>
              </Lists>
            )}

            {!isAuth && (
              <Lists className="nav-item">
                <NavLink to="/signup" className="nav-link">
                  Signup
                </NavLink>
              </Lists>
            )}

            {isAuth && (
              <Lists className="nav-item">
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>
              </Lists>
            )}

            {isAuth ? (
              <Lists className="nav-item">
                <Button secondary onClick={handleClick}>
                  <Power size={24} />
                </Button>
              </Lists>
            ) : (
              <Lists className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </Lists>
            )}
          </Ul>
        </div>
      </Navbar>
      <nav></nav>
    </>
  );
};

export default Nav;
