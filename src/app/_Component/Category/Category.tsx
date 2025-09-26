import { CategoryData, CategoryItem } from "@/types/category.type";
import Image from "next/image";
import React from "react";

export default async function Category() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`);
  const data: CategoryData = await res.json();
  const category: CategoryItem[] = data.data;

  return (
    <>
      <div className="flex items-center">
        <div className="w-4 h-8 bg-main rounded-[5px]"></div>
        <h3 className="mx-4 text-[20px] text-main font-mono">All Category</h3>
      </div>
      <div className="flex items-center flex-wrap my-10 space-y-3 gap-3">
        {category.map((item) => {
          return (
            <div key={item._id} className="w-[19%] cursor-pointer">
              <Image
                src={item.image}
                alt={item.name}
                width={500}
                height={500}
                className="w-full object-cover h-70 rounded-t-[8px]"
              />
              <h2 className="text-main font-semibold text-[18px] p-1 bg-neutral-200 rounded-b-[8px] text-center">
                {item.name}
              </h2>
            </div>
          );
        })}
      </div>
    </>
  );
}
