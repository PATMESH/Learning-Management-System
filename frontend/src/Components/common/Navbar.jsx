import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { authService } from "../../api/auth.service";

function Navbar(props) {
  const value = props.page;
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isUserAuthenticated());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = async () => {
    await authService.logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      <nav className="bg-white w-full flex flex-row justify-between items-center px-[4vw] shadow-[2px_2px_10px_rgba(0,0,0,0.15)] z-[999]">
        <div className="flex items-center justify-center">
          <img src={logo} alt="" className="w-[300px] h-[65px] cursor-pointer" />
        </div>
        <div className="flex">
          <div id="menu-btn" className="hidden">
            <div className="menu-dash" onClick={toggleMobileMenu}>
              &#9776;
            </div>
          </div>
          <i
            id="menu-close"
            className="fas fa-times hidden"
            onClick={closeMobileMenu}
          ></i>
          <ul className={`flex justify-end items-center ${isMobileMenuOpen ? "active" : ""}`}>
            {isMobileMenuOpen && (
              <li className="close-button">
                <button onClick={closeMobileMenu}>X</button>
              </li>
            )}
            {value === "home" ? (
              <li className="list-none ml-5 rounded-[5px] bg-gradient-to-r from-blue-600 to-purple-600">
                <Link 
                  to={"/"} 
                  className="no-underline text-white text-[17px] font-bold transition-all duration-300 ease-in-out px-[10px] py-[2px] block hover:text-yellow-400"
                >
                  Home
                </Link>
              </li>
            ) : (
              <li className="list-none ml-5">
                <Link 
                  to={"/"}
                  className="no-underline text-[rgb(21,21,100)] text-[17px] font-bold transition-all duration-300 ease-in-out hover:text-yellow-400"
                >
                  Home
                </Link>
              </li>
            )}
            {value === "courses" ? (
              <li className="list-none ml-5 rounded-[5px] bg-gradient-to-r from-blue-600 to-purple-600">
                <Link
                  to={"/courses"}
                  className="no-underline text-white text-[17px] font-bold transition-all duration-300 ease-in-out px-[10px] py-[2px] block hover:text-yellow-400"
                >
                  Courses
                </Link>
              </li>
            ) : (
              <li className="list-none ml-5">
                <Link 
                  to={"/courses"}
                  className="no-underline text-[rgb(21,21,100)] text-[17px] font-bold transition-all duration-300 ease-in-out hover:text-yellow-400"
                >
                  Courses
                </Link>
              </li>
            )}
            {isAuthenticated  ? (
              value === "profile" ? (
                <li className="list-none ml-5 rounded-[5px] bg-gradient-to-r from-blue-600 to-purple-600">
                  <Link
                    to={"/profile"}
                    className="no-underline text-white text-[17px] font-bold transition-all duration-300 ease-in-out px-[10px] py-[2px] block hover:text-yellow-400"
                  >
                    Profile
                    <FontAwesomeIcon icon={faUser} className="ml-1" />
                  </Link>
                </li>
              ) : (
                <li className="list-none ml-5">
                  <Link 
                    to={"/profile"}
                    className="no-underline text-[rgb(21,21,100)] text-[17px] font-bold transition-all duration-300 ease-in-out hover:text-yellow-400"
                  >
                    Profile
                    <FontAwesomeIcon icon={faUser} className="ml-1" />
                  </Link>
                </li>
              )
            ) : (
              <></>
            )}
            {isAuthenticated ? (
              value === "learnings" ? (
                <li className="list-none ml-5 rounded-[5px] bg-gradient-to-r from-blue-600 to-purple-600">
                  <Link
                    to={"/learnings"}
                    className="no-underline text-white text-[17px] font-bold transition-all duration-300 ease-in-out px-[10px] py-[2px] block hover:text-yellow-400"
                  >
                    Learnings
                    <FontAwesomeIcon icon={faChalkboardUser} className="ml-1" />
                  </Link>
                </li>
              ) : (
                <li className="list-none ml-5">
                  <Link 
                    to={"/learnings"}
                    className="no-underline text-[rgb(21,21,100)] text-[17px] font-bold transition-all duration-300 ease-in-out hover:text-yellow-400"
                  >
                    Learnings
                    <FontAwesomeIcon icon={faChalkboardUser} className="ml-1" />
                  </Link>
                </li>
              )
            ) : (
              <></>
            )}
            {isAuthenticated ? (
              <li className="list-none ml-5">
                <button 
                  onClick={handleLogOut} 
                  className="w-[120px] h-[35px] p-[1px] mb-[1px] bg-[#0047ca] border-none rounded-lg text-[rgb(250,250,250)] text-[15px] font-medium cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#002c5fe1]"
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <li className="list-none ml-5">
                <button 
                  onClick={() => navigate("/login")}
                  className="w-[120px] h-[35px] p-[1px] mb-[1px] bg-[#0047ca] border-none rounded-lg text-[rgb(250,250,250)] text-[15px] font-medium cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#002c5fe1]"
                >
                  Login/SignUp
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;