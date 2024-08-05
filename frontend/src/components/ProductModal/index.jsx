import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

import React ,{useContext}from "react";
import { MdClose, MdOutlineCompareArrows } from "react-icons/md";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import QuantityBox from "../quantityBox";
import { IoIosHeartEmpty } from "react-icons/io";
import { SwiperSlide,Swiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductZoom from "../ProductZoom";
import { MyContext } from '../../App';

function ProductModal() {
  const context = useContext(MyContext);

  return (
    <Dialog
      open={true}
      className="productModal"
      onClose={() => context.setIsOpenModel(false)}
    >
      <Button className="close_" onClick={() => context.setIsOpenModel(false)}>
        <MdClose />
      </Button>
      <h4 className="mb-1 font-weight-bold">
        All Naturals Italian Style Meatballs
      </h4>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          <span>Brands</span>
          <span className="ml-2">Welch's</span>
        </div>
        <Rating
          name="read-only"
          value={5}
          readOnly
          size="small"
          precision={0.5}
        />
      </div>
      <hr />
      <div className="row mt-2 productDetailModel">
        <div className="col-md-5">
          <ProductZoom/>
        </div>
        <div className="col-md-7">
          <div className="d-flex info align-items-center mb-2">
            <span className="oldPrice lg mr-2">$9.35</span>
            <span className="netPrice lg text-danger ">$7.35</span>
          </div>
          <span className="badge bg-success">Instock</span>
          <p className="mt-2"> description description</p>
          <div className="d-flex align-items-center">
            <QuantityBox />
            <Button className="btn-blue btn-lg btn-big btn-round ml-3">
              Add to cart
            </Button>
          </div>
          <div className="d-flex align-items-center mt-5 actions">
            <Button className="btn-round btn-sml" variant="outlined" ><IoIosHeartEmpty /> Add To Wish List </Button>
            <Button className="btn-round btn-sml ml-3" variant="outlined" ><MdOutlineCompareArrows /> COMPARE </Button>

          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductModal;
