import { ProductItem } from "@/types/productDetails.type";
import Image from "next/image";
import React from "react";
import DetailsSlider from "../DetailsSlider/DetailsSlider";
import ProductShow from "../ProductShow/ProductShow";
import AddCartButton from "../ProductCard/AddCartButton";

export default function ProductDetailsCard({
  product,
}: {
  product: ProductItem;
}) {
  const {
    ratingsQuantity,
    title,
    ratingsAverage,
    price,
    category: { name },
    images,
    _id,
    description,
  } = product;

  return (
    <>
      <div className=" w-4/5 m-auto py-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-2 ">
            <ProductShow imagess={images} />
          </div>
          <div className="col-span-5 ">
            {images?.length > 0 && <DetailsSlider images={images} />}
          </div>
          <div className="col-span-5 bg-neutral-200 p-4 rounded-[10px]">
            <h1 className="font-semibold text-2xl mb-1 ">{title}</h1>
            <p className="font-medium text-[22px] text-main">{name}</p>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="mt-2 text-[20px]">
                  <i className="fa-solid fa-star rating-color"></i>{" "}
                  {ratingsAverage}
                </span>
                <span className="mx-2 mt-1.5">({ratingsQuantity} reviews)</span>
              </div>
              <span className="text-main my-2 font-semibold text-[20px]">
                EGP {price}
              </span>
            </div>
            <p className="my-3 text-2xl">{description}</p>
            <hr className="border-black" />
            
            <div className="my-3">
              <AddCartButton id={_id}/>
            </div>
            
            <div className="my-3">
              <div className="flex items-center px-8 py-5 bg-white  border border-neutral-400 rounded-[8px]">
                <Image
                  src="/icons/icon-delivery.png"
                  alt="Car"
                  width={50}
                  height={50}
                />
                <div className="mx-5">
                  <h5>Free Delivery</h5>
                  <p className="underline">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
              <div className="flex items-center px-8 py-5 bg-white  border border-neutral-400 rounded-[8px]">
                <Image
                  src="/icons/Icon-return.png"
                  alt="return"
                  width={50}
                  height={50}
                />
                <div className="mx-5">
                  <h5>Return Delivery</h5>
                  <p className="underline">
                    Free 30 Days Delivery Returns. Details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
