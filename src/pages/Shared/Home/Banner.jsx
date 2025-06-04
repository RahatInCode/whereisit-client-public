import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const slides = [
  {
    id: 1,
    img: 'https://plus.unsplash.com/premium_photo-1661764256397-af154e87b1b3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Where Is It',
    desc: 'Uncover the secrets around you with WhereIsIt.',
  },
  {
    id: 2,
    img: 'https://ofhsoupkitchen.org/wp-content/uploads/2024/01/how-to-help-others-2.jpg',
    title: 'Help Others',
    desc: 'Help others find their items with WhereIsIt.',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    title: 'Explore Your Surroundings',
    desc: 'Let WhereIsIt guide your exploration.',
  },
];

const Banner = () => {
  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-[80vh] w-full bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="bg-black bg-opacity-50 p-6 rounded-lg text-white text-center max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-md md:text-lg">{slide.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

