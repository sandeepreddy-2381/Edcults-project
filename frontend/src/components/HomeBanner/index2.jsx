import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from "swiper/modules";
import Banner1 from '../../assets/slider-image-3.jpg';
import Banner2 from '../../assets/slider-image-4.jpg';
import Banner3 from '../../assets/slider-image-5.jpg';

function HomeBanner2() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

  return (
    
    <div className='container mt-3'>
    <div className='homeBannerSection2'>
    <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        navigation={true}
        speed={500} // 500ms for transition speed
        autoplay={{
          delay: 3000, // 3000ms (3 seconds) between slides
          disableOnInteraction: false, // Auto-slide won't stop on user interactions
        }}
      >
         <SwiperSlide>
        <div className="items">
       <img src={Banner1} />
       </div>
       </SwiperSlide>
       <SwiperSlide>
        <div className="items">
       <img src={Banner2} />
       </div>
       </SwiperSlide>
       <SwiperSlide>
        <div className="items">
       <img src={Banner3} />
       </div>
       </SwiperSlide>
      </Swiper>
      
       </div>
    </div>
  )
}

export default HomeBanner2;
