import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { IoMdSearch } from "react-icons/io";
import Box from "@mui/material/Box";
import { MdClose } from "react-icons/md";
import { MyContext } from "../../../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CountryDropDown() {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedTab, setSelectedTab] = useState(null);


  const context = useContext(MyContext);


  const [placeList,setPlaceList] = useState([]);
 


  useEffect(() => {
    console.log(context.countryList);
    setPlaceList(context.countryList);
  }, [context.countryList]);

  const selectPlace = (index) => {
    setSelectedTab(index);
    setIsOpen(false);
  };


  const filterList = (e) =>{

    const keyword = e.target.value.toLowerCase();

    const list = placeList.filter((item) => {
      return item.country.toLowerCase().includes(keyword);
    });

    setPlaceList(list);

  } 

  return (
    <>
      <Button className="countryDrop" onClick={() => setIsOpen(true)}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span className="label"> Your Location </span>
          <span className="name"> India </span>
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          <FaAngleDown />
        </Box>
      </Button>

      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        onClose={() => setIsOpen(false)}
        className="location-model"
        sx={{
          "& .MuiPaper-root": {
            padding: "25px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            position: "relative",
          },
          "& h4": {
            marginBottom: "10px",
            color: "#333",
          },
          "& p": {
            color: "#555",
          },
          "& ul": {
            marginBottom: "0px",
            maxHeight: "400px",
            overflowY: "scroll",
            overflowX: "hidden",
            padding: 0,
          },
          "& li": {
            width: "100%",
            listStyle: "none",
          },
          "& li button": {
            width: "100%",
            textTransform: "capitalize !important",
            color: "#000 !important",
            justifyContent: "flex-start !important",
            padding: "15px 20px",
          },
          "& li button:hover": {
            background: "#f1f1f1",
          },
          "& li button.active": {
            background: "#ccc",
          },
          // "& .close_": {
          //   position: "absolute",
          //   top: "20px",
          //   right: "20px",
          //   color: "black !important",
          //   minWidth: "40px !important",
          //   width: "40px !important",
          //   height: "40px !important",
          //   borderRadius: "50% !important",
          // },
          // "& .close_ svg": {
          //   fontSize: "22px",
          // },
        }}
      >
        <h4>Choose Your Location</h4>
        <p>Enter your Address and we will specify the offer for your area</p>
        <Button className="close_" onClick={() => setIsOpen(false)}>
          <MdClose />
        </Button>
        <Box
          sx={{
            width: "100%",
            height: "60px",
            backgroundColor: "#f3f4f7",
            padding: "10px",
            position: "relative",
            borderRadius: "10px",
            border: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component="input"
            type="text"
            placeholder="Search for area....."
            onChange={filterList}
            sx={{
              backgroundColor: "transparent",
              outline: "none",
              fontSize: "16px",
              color: "rgba(0, 0,0,.8)",
              width: "100%",
              height: "40px",
              border: "none",
              padding: "0px 20px",
            }}
          />
          <Button
            sx={{
              position: "absolute",
              top: "10px",
              right: "15px",
              zIndex: "100",
              minWidth: "40px",
              height: "40px",
              borderRadius: "50%",
              color: "#000",
            }}
          >
            <IoMdSearch sx={{ fontSize: "25px" }} />
          </Button>
        </Box>

        <ul>
          {placeList?.length !== 0 &&
            placeList?.map((item, index) => (
              <li key={index}>
                <Button
                  onClick={() => selectPlace(index)}
                  className={selectedTab === index ? "active" : ""}
                  sx={{
                    "&.active": {
                      background: "#ccc",
                    },
                  }}
                >
                  {item.country}
                </Button>
              </li>
            ))}
        </ul>
      </Dialog>
    </>
  );
}

export default CountryDropDown;
