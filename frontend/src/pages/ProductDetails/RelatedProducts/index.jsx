import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MyContext } from "../../../App";
import ProductItem from "../../../components/productItem";

function RelatedProducts() {
  const products = [
    {
      id: 1,
      image: "../../assets/product-1.png",
      name: "Werther'original caramel hard candies",
      status: "In Stock",
      rating: 5,
      oldPrice: 20.0,
      netPrice: 10.0,
      discount: 28,
    },
    {
      id: 2,
      image: "../../assets/product-2.png",
      name: "Product 2",
      status: "In Stock",
      rating: 4.5,
      oldPrice: 25.0,
      netPrice: 15.0,
      discount: 30,
    },
    {
      id: 3,
      image: "../../assets/product-3.png",
      name: "Werther'original caramel hard candies",
      status: "In Stock",
      rating: 5,
      oldPrice: 20.0,
      netPrice: 10.0,
      discount: 28,
    },
    {
      id: 4,
      image: "../../assets/product-4.png",
      name: "Werther original caramel hard candies",
      status: "In Stock",
      rating: 5,
      oldPrice: 20.0,
      netPrice: 10.0,
      discount: 28,
    },
    {
      id: 5,
      image: "../../assets/product-5.png",
      name: "Werther'original caramel hard candies",
      status: "In Stock",
      rating: 5,
      oldPrice: 20.0,
      netPrice: 10.0,
      discount: 28,
    },
    {
      id: 6,
      image: "../../assets/product-6.png",
      name: "Werther'original caramel hard candies",
      status: "In Stock",
      rating: 5,
      oldPrice: 20.0,
      netPrice: 10.0,
      discount: 28,
    },
  ];

  const context = useContext(MyContext);
  const viewProductDetails = (id) => {
    context.setIsOpenModel(true);
  };

  return (
    <div className="col-md-12 productRow">
      <div className="d-flex align-items-center">
        <div className="info w-75">
          <h3 className="mb-0 hd">Related Products</h3>
          <p className="text-sml mb-0">
            Don't miss current Offer until end of March
          </p>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        slidesPerView={5}
        speed={500}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductItem
              product={product}
              viewProductDetails={viewProductDetails}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default RelatedProducts;
