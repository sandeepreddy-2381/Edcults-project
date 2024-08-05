// import React from "react";
// import HomeBanner2 from "../../components/HomeBanner/index2";
// import Button from "@mui/material/Button";
// import banner1 from "../../assets/banner_5.jpg";
// import banner2 from "../../assets/banner_4.jpg";
// import banner3 from "../../assets/banner_1.jpg";
// import banner4 from "../../assets/banner_2.jpg";
// import banner5 from "../../assets/banner_3.jpg";
// import news from "../../assets/NewLette.png";
// import { IoIosArrowRoundForward } from "react-icons/io";

// import ProductItem from "../../components/productItem";
// import HomeCat from "../../components/HomeCat";
// import { IoMailOutline } from "react-icons/io5";

// export const Home = () => {
//   return (
//     <>
//       <HomeBanner2 />

//       <HomeCat />

//       <section className="homeProducts">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-3">
//               <div className="banner">
//                 <img src={banner1} alt="" />
//                 <div className="content">
//                   <h4>Best Bakery products</h4>
//                   <h3>Fresh Products</h3>
//                   <h3>every hour</h3>
//                   <h4>only-from</h4>
//                   <Button className="btn">Shop Now</Button>                    
//                   </div>
//               </div>

//               <div className="banner mt-4">
//                 <img src={banner2} alt="" />
//               </div>
//             </div>

//             <div className="col-md-9 productRow">
//               <div className="d-flex align-items-center">
//                 <div className="info w-75">
//                   <h3 className="mb-0 hd">Best seller</h3>
//                   <p className="text-sml mb-0">
//                     Dont miss current Offer until end of March
//                   </p>
//                 </div>

//                 <Button className="viewAllBtn ml-auto">
//                   View All
//                   <IoIosArrowRoundForward />
//                 </Button>
//               </div>
//               <ProductItem/>

//               <div className="d-flex align-items-center mt-5">
//                 <div className="info w-75">
//                   <h3 className="mb-0 hd">New Products</h3>
//                   <p className="text-sml mb-0">
//                     Dont miss current Offer until end of March
//                   </p>
//                 </div>

//                 <Button className="viewAllBtn ml-auto">
//                   View All
//                   <IoIosArrowRoundForward />
//                 </Button>
//               </div>
//               <ProductItem/>
//             </div>

            // <div className="d-flex mt-4 mb-5 bannerSection">
            //   <div className="banner">
            //     <img src={banner3} alt="" className="cursor w-100" />
            //   </div>
            //   <div className="banner">
            //     <img src={banner4} alt="" className="cursor w-100" />
            //   </div>
            //   <div className="banner">
            //     <img src={banner5} alt="" className="cursor w-100" />
            //   </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-6">
//               <p className="text-white mb-1"> 20$ discount for your first order</p>
//               <h3 className="text-white"> Join our newsltter and get ....</h3>
//               <p className="text-light">Join our email subscription now to get updates on<br /> promotions and coupons. </p>

//               <form>
//                 <IoMailOutline />
//                 <input type="text" placeholder="your email address ...." />
//                 <Button>Subscribe</Button>
//               </form>


//             </div>
//             <div className="col-md-6">
//               <img src={news} alt="" />
//             </div>
//           </div>
//         </div>
//       </section>

//     </>
//   );
// };

// export default Home;
import React,{useContext,useState} from "react";
import HomeBanner2 from "../../components/HomeBanner/index2";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { IoIosArrowRoundForward } from "react-icons/io";
import banner1 from "../../assets/banner_5.jpg";
import banner2 from "../../assets/banner_4.jpg";
import banner3 from "../../assets/banner_1.jpg";
import banner4 from "../../assets/banner_2.jpg";
import banner5 from "../../assets/banner_3.jpg";
import news from "../../assets/NewLette.png";

import ProductItem from "../../components/productItem";
import HomeCat from "../../components/HomeCat";
import { IoMailOutline } from "react-icons/io5";
import { MyContext } from '../../App';

import {useGetProductsQuery} from '../../redux/services/products'




export const Home = () => {

  const { data, error, isLoading } = useGetProductsQuery();



  const context = useContext(MyContext);
  const [isOpenModal , setIsOpenModel] = useState(false);

  const viewProductDetails = (id) =>{

    context.setIsOpenModel(true);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <HomeBanner2 />

      <HomeCat />

      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="banner">
                <img src={banner1} alt="" />
                <div className="content">
                  <h4>Best Bakery products</h4>
                  <h3>Fresh Products</h3>
                  <h3>every hour</h3>
                  <h4>only-from</h4>
                  <Button className="btn">Shop Now</Button>
                </div>
              </div>

              <div className="banner mt-4">
                <img src={banner2} alt="" />
              </div>
            </div>

            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">Best seller</h3>
                  <p className="text-sml mb-0">Don't miss current Offer until end of March</p>
                </div>

                <Button className="viewAllBtn ml-auto">
                  View All
                  <IoIosArrowRoundForward />
                </Button>
              </div>

              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={10}
                slidesPerView={4}
                speed={500}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                {data.products.map(product => (
                  <SwiperSlide key={product.id}>
                    <ProductItem product={product} viewProductDetails={viewProductDetails} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="d-flex align-items-center mt-5">
                <div className="info w-75">
                  <h3 className="mb-0 hd">New Products</h3>
                  <p className="text-sml mb-0">Don't miss current Offer until end of March</p>
                </div>

                <Button className="viewAllBtn ml-auto">
                  View All
                  <IoIosArrowRoundForward />
                </Button>
              </div>

              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={10}
                slidesPerView={4}
                speed={500}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                {data.products.map(product => (
                  <SwiperSlide key={product.id}>
                    <ProductItem product={product} viewProductDetails={viewProductDetails} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="d-flex mt-4 mb-5 bannerSection">
              <div className="banner">
                <img src={banner3} alt="" className="cursor w-100" />
              </div>
              <div className="banner">
                <img src={banner4} alt="" className="cursor w-100" />
              </div>
              <div className="banner">
                <img src={banner5} alt="" className="cursor w-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white mb-1">20$ discount for your first order</p>
              <h3 className="text-white">Join our newsletter and get ...</h3>
              <p className="text-light">
                Join our email subscription now to get updates on
                <br />
                promotions and coupons.
              </p>

              <form>
                <IoMailOutline />
                <input type="text" placeholder="your email address ...." />
                <Button>Subscribe</Button>
              </form>
            </div>
            <div className="col-md-6">
              <img src={news} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
