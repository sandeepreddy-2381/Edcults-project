import React, { useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {
  Navigation,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import SideBar from "../../components/SideBar";
import { IoIosMenu } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { TbGridDots } from "react-icons/tb";
import { HiViewGrid } from "react-icons/hi";
import banner1 from "../../assets/cat-ban.png";
import banner2 from "../../assets/cat-ban2.png";
import banner3 from "../../assets/cat-ban3.png";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProductItem from "../../components/productItem/index";
import { MyContext } from "../../App";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useGetCategoryProductsQuery } from "../../redux/services/products";
import { useParams } from "react-router-dom";

function Listing() {

  const {id} = useParams();

  const { data, error, isLoading } = useGetCategoryProductsQuery(id);
  const [productView, setProductItem] = useState("four");
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const [anchorEl, setAnchorEl] = useState(null);
  const openDropDown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useContext(MyContext);
  const [isOpenModal, setIsOpenModel] = useState(false);

  const viewProductDetails = (id) => {
    context.setIsOpenModel(true);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.textContent));
    setCurrentPage(1); // Reset to first page on items per page change
    handleClose();
  };

  // Calculate total pages
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Paginate the data
  const paginatedData = data.products?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];




  return (
    <section className="product_listing_page">
      <div className="container">
        <div className="productListing d-flex">
          <SideBar />
          <div className="contentRight">
            <img src={banner1} alt="Banner 1" />

            <div className="showBy mt-3 mb-3 d-flex align-items-center">
              <div className="d-flex btnWrapper">
                <Button className={productView === "one" && 'act'} onClick={() => setProductItem("one")}>
                  <IoIosMenu />
                </Button>
                <Button className={productView === "three" && 'act'} onClick={() => setProductItem("three")}>
                  <CgMenuGridR />
                </Button>
                <Button className={productView === "four" && 'act'} onClick={() => setProductItem("four")}>
                  <TbGridDots />
                </Button>
              </div>
              <div className="ml-auto showByFilter">
                <Button onClick={handleClick}>
                  Show {itemsPerPage} <FaAngleDown />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openDropDown}
                  onClose={handleClose}
                  MenuListProps={{ "aria-labelledby": "basic-button" }}
                  className="w-100 showPerPageDropDown"
                >
                  <MenuItem onClick={handleItemsPerPageChange}>9</MenuItem>
                  <MenuItem onClick={handleItemsPerPageChange}>12</MenuItem>
                  <MenuItem onClick={handleItemsPerPageChange}>18</MenuItem>
                </Menu>
              </div>
            </div>

            <div className="productListings">
              {data.products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  viewProductDetails={viewProductDetails}
                  itemView={productView}
                />
              ))}
            </div>

            <div className="d-flex align-items-center justify-content-center mt-5">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPage(page)}
                  color="primary"
                  size="large"
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Listing;
