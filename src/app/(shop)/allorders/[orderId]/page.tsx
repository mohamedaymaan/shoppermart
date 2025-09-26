'use client'
import Image from "next/image";
import React, { useEffect } from "react";

export default function Order() {

//  async function getOrderData(){
//     const data = await getOrder();
//     console.log(data)
      
//   }
//   useEffect(()=>{getOrderData()},[])
  return (
    <>
      <div className="w-[80%] mx-auto">
        <div className="border border-neutral-400 p-4 shadow-2xs rounded-2xl my-5">
          <h3 className="text-2xl font-medium text-main">My Orders</h3>
          <div className="my-2">
            <div className="my-2">
              <div className="border border-neutral-400 bg-neutral-100 rounded-t-2xl p-2">
                <h4 className="text-[20px] font-medium">Order 67852</h4>
                <p>Placed on September 26, 2025</p>
              </div>
              <div className="p-2 flex justify-between items-center rounded-b-2xl border-x border-b border-neutral-400">
                <Image src="/" alt="sad" width={100} height={100} />
                <div className="flex flex-col justify-center items-center">
                  <p>items</p>
                  <p>3 Items</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p>Total Amount</p>
                  <p>33143$</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p>Deliverd to</p>
                  <p>Ahmed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
