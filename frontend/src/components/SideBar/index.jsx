import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { Link } from "react-router-dom";

import sideBarBanner from "../../assets/sidebar-banner.gif"

function SideBar() {
  const [value, setValue] = useState([100, 60000]);
  const [value2, setValue2] = useState(0);
  return (
    <>
      <div className="sideBar">
        <div className="sticky">
        <div className="filterBox">
          <h6>Product Categories</h6>

          <div className="scroll">
            <ul>
              <li>
                <FormControlLabel control={<Checkbox />} label="Men" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Men" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Mens" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="WoMen" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Beauty" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Beauty" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Beauty" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Beauty" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Beauty" />
              </li>
            </ul>
          </div>
        </div>
        <div className="filterBox">
          <h6>Filter By Price</h6>
          <RangeSlider
            value={value}
            onInput={setValue}
            min={100}
            max={60000}
            step={5}
          />{" "}
          <div className="d-flex pt-2 pb-2 priceRange">
            <span>
              From: <strong className="text-dark">Rs: {value[0]}</strong>
            </span>

            <span className="ml-auto">
              From:{" "}
              <strong className="text-dark">
                Rs:
                {value[1]}
              </strong>
            </span>
          </div>
        </div>
        <div className="filterBox">
          <h6>Products status</h6>
          <div className="scroll">
            <ul>
              <li>
                <FormControlLabel control={<Checkbox />} label="Men" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Men" />
              </li>
            </ul>
          </div>
        </div>
        <div className="filterBox">
          <h6>Brands</h6>
          <div className="scroll">
            <ul>
              <li>
                <FormControlLabel control={<Checkbox />} label="Men" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Men" />
              </li>
            </ul>
          </div>
        </div>

        <br/>

        <Link to ="" >
        <img src={sideBarBanner} alt="" />
        </Link>
        </div>
      </div>
    </>
  );
}

export default SideBar;
