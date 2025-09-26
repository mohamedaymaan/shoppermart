"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 5000

   
  };
  return (
    <>
      <div className="grid grid-cols-12 my-4 gap-4">
        <div className="col-span-9">
          <Slider {...settings}>
            <div>
              <Image
                src="/images/slider-image-3.jpeg"
                alt="Img1"
                width={1000}
                height={100}
                className="w-full h-97 object-cover rounded-2xl"
              />
            </div>
            <div>
              <Image
                src="/images/slider-image-2.jpeg"
                alt="Img1"
                width={1000}
                height={100}
                className="w-full h-97 object-cover rounded-2xl"
              />
            </div>
            <div>
              <Image
                src="/images/slider-image-1.jpeg"
                alt="Img1"
                width={1000}
                height={100}
                className="w-full h-97 object-cover rounded-2xl"
              />
            </div>
          </Slider>
        </div>
        <div className="col-span-3 space-y-3">
            <Image src="/images/slider-image-2.jpeg" alt="Choclate" width={500} height={500} className="w-full object-cover h-47 rounded-2xl "/>
            <Image src="/images/slider-image-3.jpeg" alt="Choclate" width={500} height={500}
            className="w-full object-cover h-47 rounded-2xl"/>
        </div>
      </div>
    </>
  );
}
