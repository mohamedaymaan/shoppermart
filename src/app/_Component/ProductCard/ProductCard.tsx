import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { product } from "@/types/products.type";
import Link from "next/link";
import AddCartButton from "./AddCartButton";

export default function ProductCard({ product }: { product: product }) {
  const {
    imageCover,
    title,
    ratingsAverage,
    price,
    category: { name },
    _id,
  } = product;
  return (
    <>
      <Card>
        <Link href={"/products/" + _id}>
          <CardHeader>
            <Image
              src={imageCover}
              alt={title}
              width={200}
              height={100}
              className="w-full object-cover  "
            />
            {/* <CardAction className="p-2 bg-neutral-200 hover:bg-red-300 rounded-[100px]"><i className="fa-regular fa-heart text-2xl text-main"></i></CardAction> */}
          </CardHeader>
          <CardContent className="space-y-3.5">
            <CardTitle className="text-main">{name}</CardTitle>
            <CardTitle>{title.split(" ").splice(0, 2).join(" ")}</CardTitle>
            <div className="flex flex-col">
              <span className="text-main mb-2">{price}EGP</span>
              <span className="mb-2 ">
                {ratingsAverage}
                <i className="fa-solid fa-star rating-color ms-1"></i>
              </span>
            </div>
          </CardContent>
        </Link>
          <CardFooter>
            <AddCartButton id={_id}/>
          </CardFooter>
      </Card>
    </>
  );
}
