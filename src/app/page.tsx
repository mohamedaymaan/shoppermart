import { product, ProductData } from "@/types/products.type";
import React, { Suspense } from "react";
import ProductCard from "./_Component/ProductCard/ProductCard";
import MainSlider from "./_Component/MainSlider/MainSlider";
import Category from "./_Component/Category/Category";
import HomeLoading from "./_Component/Loading/HomeLoading/HomeLoading";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?sort=createdAt`
  );
  const data: ProductData = await res.json();
  const productList: product[] = data.data;

  return (
    <>
      <MainSlider />
      <Category />
      <div className="flex items-center">
        <div className="w-4 h-8 bg-main rounded-[5px]"></div>
        <h3 className="mx-4 text-[20px] text-main font-mono">All Product</h3>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 my-4">
        <Suspense fallback={<HomeLoading />}>
          {productList.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </Suspense>
      </div>
    </>
  );
}
