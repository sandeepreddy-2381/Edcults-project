import React from "react";
import { IoMdSearch } from "react-icons/io";
import Button from "@mui/material/Button";



function SearchBox() {
  return (
    <div className="headerSearch ml-3 mr-3">
      <input type="text" placeholder="Search for products....." />
      <Button>
        <IoMdSearch />
      </Button>
    </div>
  );
}

export default SearchBox;
