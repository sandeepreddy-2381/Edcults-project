import React,{ useRef ,useContext, useState} from 'react'
import { SwiperSlide,Swiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";
import { MyContext } from '../../App';

function ProductZoom() {

    const context = useContext(MyContext);

    const [slideIndex ,setSlideIndex] = useState(0);
  
    const zoomSliderBig = useRef();
    const zoomSlider = useRef();
  
    const goto = (index) => {
      setSlideIndex(index)
      zoomSlider.current.swiper.slideTo(index);
      zoomSliderBig.current.swiper.slideTo(index);
    };

  
  return (
    <>
    <div className="productZoom postion-relative">
    <div className="badge badge-primary">23%</div>
    <Swiper
     modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
     spaceBetween={10}
     slidesPerView={1}
     speed={500} 
     autoplay={{
       delay: 3000, 
       disableOnInteraction: false, 
     }}
    className="zoomSliderBig"
    ref ={zoomSliderBig}>
      <SwiperSlide >
      <div className="item">
        <InnerImageZoom zoomType="hover" zoomScale={1} src={product1} />
      </div>
      </SwiperSlide>
      <SwiperSlide >
      <div className="item">
        <InnerImageZoom zoomType="hover" zoomScale={1} src={product2} />
      </div>
      </SwiperSlide>
      <SwiperSlide >
      <div className="item">
        <InnerImageZoom zoomType="hover" zoomScale={1} src={product3} />
      </div>
      </SwiperSlide>
      </Swiper>
  </div>
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
    spaceBetween={0}
    slidesPerView={5}
    speed={500}
    slidesPerGroup={1}
    className="zoomSlider"
    ref ={zoomSlider}>
      <SwiperSlide >
    <div className="item">
      <img src={product1} className="w-100" onClick={() => goto(0)} />
    </div>
    </SwiperSlide>
    <SwiperSlide >
    <div className="item">
      <img src={product2} className="w-100" onClick={() => goto(1)} />
    </div>
    </SwiperSlide>
    <SwiperSlide >
    <div className="item">
      <img src={product3} className="w-100" onClick={() => goto(2)} />
    </div>
    </SwiperSlide>
  </Swiper>
  </>
  )
}

export default ProductZoom;