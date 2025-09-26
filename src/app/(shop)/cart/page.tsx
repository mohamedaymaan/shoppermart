"use client";
import CartLoading from "@/app/_Component/CartLoading/CartLoading";
import {
  ClearProducts,
  DeleteProduct,
  getCartData,
  UpdateProductQuantity,
} from "@/CartAction/CartAction";
import { Button } from "@/components/ui/button";
import { CountContext } from "@/CountProvider";
import { Cart, CartData } from "@/types/cart.type";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const CountData = useContext(CountContext);
  const [countDisabled, setCountDisabled] = useState(false);
  const [currentId, setCurrentId] = useState<string>();
  const [contLoad, setCountLoad] = useState(false);
  const [loading, SetLoading] = useState(true);
  const [numOfCartItems, setNumOfCartItems] = useState<number>(0);
  const [cart, setCart] = useState<Cart>();
   useEffect(() => {
    getAllCartData();
  }, []);
  async function getAllCartData() {
    SetLoading(true);
    const data: CartData = await getCartData();
    setCart(data?.data);
    setNumOfCartItems(data?.numOfCartItems);
    SetLoading(false);

  }

  async function removeProduct(id: string) {
    const data = await DeleteProduct(id);
    if (data?.status == "success") {
      toast.success("Product Deleted Successfully!", {
        position: "top-center",
      });
      setCart(data.data);
      
            const sum = data.data.products.reduce((total: number,item: { count: number; })=> total += item.count,0);

            CountData?.setCount(sum)
    }
  }

  async function clearCart() {
    const data = await ClearProducts();
    console.log(data);
    if (data?.message == "success") {
      toast.success("Products Deleted!", { position: "top-center" });
      setCart(undefined);

            CountData?.setCount(0)
    }
  }

  async function updateProductCount(id: string, count: number) {
    setCurrentId(id);
    setCountLoad(true);
    setCountDisabled(true);
    const data = await UpdateProductQuantity(id, count);
    console.log(data);
    if (data.status == "success") {
      setCart(data.data);
       const sum = data.data.products.reduce((total: number,item: { count: number; })=> total += item.count,0);

            CountData?.setCount(sum)
    }
    setCountLoad(false);
    setCountDisabled(false);
  }
  return (
    <>
      <div className="w-[80%] m-auto">
        <div className="flex justify-between items-end my-5 ">
          <h2 className="text-4xl">Cart ({CountData?.count})</h2>
        </div>
        {loading ? (
          <CartLoading />
        ) : (
          <>
            {cart != undefined && cart?.totalCartPrice != 0 ? (
              <>
                <div className="flex items-center justify-end my-4">
                  <Button
                    onClick={() => clearCart()}
                    className="bg-red-600 rounded-[6px]"
                  >
                    Clear Cart{" "}
                  </Button>
                </div>
                <div className="bg-neutral-100 p-2 rounded-[10px]">
                  {cart?.products.map((item) => {
                    return (
                      <div key={item._id}>
                        <div className="flex items-center justify-between p-3">
                          <div>
                            <div className="flex flex-wrap">
                              <div>
                                <Image
                                  src={item.product.imageCover}
                                  alt={item.product.title}
                                  width={100}
                                  height={100}
                                  className="w-full h-32 object-cover"
                                />
                              </div>
                              <div className="mx-3">
                                <p className="text-main text-3xl">
                                  {item.product.title
                                    .split(" ")
                                    .slice(0, 5)
                                    .join(" ")}
                                </p>
                                <span>In Stock</span>
                              </div>
                            </div>
                            <div>
                              <Button
                                disabled={countDisabled}
                                onClick={() => removeProduct(item.product._id)}
                                className="bg-neutral-300  text-red-600 p-2 text-[18px] my-2 hover:bg-main cursor-pointer "
                              >
                                <i className="fa-solid fa-trash text-red-600"></i>
                                Remove
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center items-center">
                            <div className="my-3 text-2xl">
                              <p>EGP {item.price}</p>
                            </div>
                            <div>
                              {item.count == 1 ? (
                                <Button
                                  disabled
                                  onClick={() =>
                                    updateProductCount(
                                      item.product._id,
                                      (item.count -= 1)
                                    )
                                  }
                                  className="w-[24px] h-[24px] rounded-[4px] cursor-pointer p-4 bg-neutral-500"
                                >
                                  <i className="fa-solid fa-minus"></i>
                                </Button>
                              ) : (
                                <Button
                                  disabled={countDisabled}
                                  onClick={() =>
                                    updateProductCount(
                                      item.product._id,
                                      (item.count -= 1)
                                    )
                                  }
                                  className="w-[24px] h-[24px] rounded-[4px] cursor-pointer p-4 bg-neutral-500"
                                >
                                  <i className="fa-solid fa-minus"></i>
                                </Button>
                              )}
                              {contLoad && currentId == item.product._id ? (
                                <i className="fa-solid fa-spin fa-circle-notch text-main"></i>
                              ) : (
                                <span className="mx-3 text-[20px]">
                                  {item.count}
                                </span>
                              )}

                              <Button
                                disabled={countDisabled}
                                onClick={() =>
                                  updateProductCount(
                                    item.product._id,
                                    (item.count += 1)
                                  )
                                }
                                className="w-[24px] h-[24px] rounded-[4px] cursor-pointer p-4 bg-main"
                              >
                                <i className="fa-solid fa-plus"></i>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <hr className="bg-neutral-500 h-0.5 w-[90%] mx-auto" />
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between my-8">
                  <div>
                    <Link href="/">
                      <Button className="border border-neutral-400 bg-transparent text-black hover:text-white p-6 rounded-[5px]">
                        Return to Shop
                      </Button>
                    </Link>
                  </div>
                  <div className="border border-neutral-500 p-5 rounded-[5px] w-1/3">
                    <p className="text-2xl">Cart Total</p>
                    <div className="flex items-center justify-between my-3">
                      <p>Subtotal:</p>
                      <p>EGP {cart?.totalCartPrice}</p>
                    </div>
                    <hr className="h-0.5 bg-neutral-500" />
                    <div className="flex items-center justify-between my-3">
                      <p>Shipping:</p>
                      <p>Free</p>
                    </div>
                    <hr className="h-0.5 bg-neutral-500" />
                    <div className="flex items-center justify-between my-4">
                      <p>Total:</p>
                      <p>EGP {cart?.totalCartPrice}</p>
                    </div>
                    <div>
                      <Button className="w-1/2 bg-main rounded-[4px] mx-auto block cursor-pointer">
                        <Link className="text-white" href={'/checkoutsession/' + cart._id}>Procees to checkout</Link>  
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                Your cart is empty!
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
