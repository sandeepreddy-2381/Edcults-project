import React, { useContext, useState } from "react";
import Logo from "../../assets/Log.webp";
import { Link, useNavigate } from "react-router-dom";
import CountryDropDown from "./countryDropDown/index";
import Button from "@mui/material/Button";
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import SearchBox from "./searchBox/index";
import Navigation from "./navigation";
import { MyContext } from "../../App";
import { AccountCircle, ListAlt, ExitToApp } from "@mui/icons-material";

export const Header = ({ onSignOut }) => {
  const context = useContext(MyContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const openDropDown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div className="headerWrapper">
      <div className="top-strip bg-purple">
        <div className="container">
          <p className="mb-0 mt-0 text-center">
            Due to the <b>COVID-19</b> epidemic, orders may be processed with
            slight delay.
          </p>
        </div>
      </div>
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="logoWrapper d-flex align-items-center col-sm-2">
              <Link to={"/"}>
                <img src={Logo} alt="Logo" />
              </Link>
            </div>
            <div className="col-sm-10 d-flex align-items-center part2">
              {context.placeList?.length !== 0 && <CountryDropDown />}
              <SearchBox />

              <div className="user d-flex align-items-center ml-auto">
                <Button className="circle mr-3" onClick={handleClick}>
                  <FiUser />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openDropDown}
                  onClose={handleClose}
                  MenuListProps={{ "aria-labelledby": "basic-button" }}
                  className="custom-menu"
                >
                  <MenuItem onClick={handleClose}>
                    <Button startIcon={<AccountCircle />}>Profile</Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/orders" ><Button startIcon={<ListAlt />}>Orders</Button></Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button onClick={() => onSignOut()} startIcon={<ExitToApp />}>
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
                <div className="ml-auto cartTab d-flex align-items-center">
                  <span className="price">$3.39</span>
                  <div className="icon postion-relative ml-2">
                    <Link to="/cart">
                      <Button className="circle">
                        <IoBagOutline />
                      </Button>
                    </Link>
                    {/* <span className='count d-flex align-items-center justify-content-center'>1</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Header;
