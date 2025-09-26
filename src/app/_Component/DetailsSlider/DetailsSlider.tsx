"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function DetailsSlider({ images }: { images: string[] }) {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  };
  console.log(images);
  
  return (
    <>
      <Slider {...settings} >
        {images.map((image) => {
          return (
            <div key={image}>
              <Image
                src={image}
                alt={image}
                width={1000}
                height={100}
                className="w-full rounded-[8px]"
              />
            </div>
          );
        })}
      </Slider>
    </>
  );
}
