import React, { useState } from 'react';
import { UilEstate, UilClipboardAlt, UilUsersAlt, UilPackage, UilChart, UilSignOutAlt, UilBars, UilStore } from "@iconscout/react-unicons";
import Logo from '../../imgs/logo.png';
import './Sidebar.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SideBarData = [
  { icon: UilEstate, heading: "Dashboard", path: "/" },
  { icon: UilClipboardAlt, heading: "Orders", path: "/orders" },
  { icon: UilStore, heading: "All products", path: "/allproducts" },
  { icon: UilPackage, heading: "Add Product", path: "/products" },
];

const Sidebar = ({ isAuthenticated, onSignOut }) => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const sidebarVariants = {
    true: { left: '0' },
    false: { left: '-60%' },
  };

  return (
    <>
      <div
        className='bars'
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="Sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>
        <div className="menu">
          {SideBarData.map((item, index) => {
            return (
              <Link
                key={index}
                to={item.path}
                className={selected === index ? 'menuItem active' : 'menuItem'}
                onClick={() => setSelected(index)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </Link>
            );
          })}
          {isAuthenticated && (
            <div className="menuItem-signout" onClick={onSignOut}>
              <UilSignOutAlt /> Sign Out
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
