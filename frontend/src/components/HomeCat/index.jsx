import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Button from "@mui/material/Button";
import cat1 from '../../assets/cat-1.png';
import cat2 from '../../assets/cat-2.png';
import cat3 from '../../assets/cat-3.png';
import cat4 from '../../assets/cat-4.png';
import cat5 from '../../assets/cat-9.png';
import cat6 from '../../assets/cat1.png';
import cat7 from '../../assets/cat2.png';
import cat8 from '../../assets/cat3.webp';
import cat9 from '../../assets/cat4.png';
import cat10 from '../../assets/cat5.webp';

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

function HomeCat() {

    const [itemBg ,setItemBg] = useState([
        '#fffceb',
        '#ecffec',
        '#feefea',
        '#fff3eb',
        '#f2fce4',
        '#feefea',
        '#fffceb',
        '#ecffec',
        '#fff3eb',
        '#f2fce4',
    ]);

    const categories = [
        cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10
    ];

  return (
    <>
      <section className="homeCat">
        <div className="container">
            <h3 className="md-4 hd">Featured Categories</h3>

          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={8}
            slidesPerGroup={3}
            slidesPerView={8}
            speed={500}
            // navigation={true}
            autoplay={{
              delay: 2000, 
              disableOnInteraction: false, 
            }}
          >
            {categories.map((cat, index) => (
              <SwiperSlide key={index}>
                <div className="item text-center" style={{ backgroundColor: itemBg[index] }}>
                  <img src={cat} alt={`cat-${index + 1}`} />
                  <h6>dummy</h6>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default HomeCat;
