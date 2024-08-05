import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Banner1 from '../../assets/banner-img.jpg';
import Banner2 from '../../assets/ban2.jpg';
import Banner3 from '../../assets/ban3.jpg';

function HomeBanner() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='homeBannerSection'>
      {/* <Slider {...settings}> */}
        <div className="content">
            <h3>Fresh and <span>Organic</span> Products For You</h3>
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel dicta tempore dolorum. Id molestiae tempora perspiciatis tempore?</p> */}
            {/* <a href="#" className="btn">Shop Now</a> */}
        </div>
      {/* </Slider> */}
    </div>
  );
}

export default HomeBanner;


// <div className='item'> 
// <img className='w-100' src={Banner1} alt="Banner 1" />
// </div>
// <div className='item'> 
// <img className='w-100' src={Banner2} alt="Banner 2" />
// </div>
// <div className='item'> 
// <img className='w-100' src={Banner3} alt="Banner 3" />
// </div>