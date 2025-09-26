"use server";
import { getUserToken } from "@/getUserToken";
import { CartData } from "@/types/cart.type";
import { error } from "console";

export async function getCartData() {
  const token = await getUserToken();
  if (!token) {
    throw new Error("token Error");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    headers: {
      token: token as string,
    },
  });
  console.log(token);
  const data: CartData = await res.json();
  return data;
}

export async function AddProductToCart(id: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("token Error");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "post",
    body: JSON.stringify({
      productId: id,
    }),
    headers: {
      token: token as string,
      "content-type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function DeleteProduct(id: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("token Error");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
    method:"delete",
    headers:{
      token:token as string
    }
  })
  const data = await res.json();
  return data;
}


export async function ClearProducts(){
  const token = await getUserToken();
  if (!token) {
    throw new Error("token Error");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
    method:"delete",
    headers:{
      token:token as string
    }
  })
  const data = await res.json();
  return data;
}

export async function UpdateProductQuantity(id:string,count:number){
    const token = await getUserToken();
  if (!token) {
    throw new Error("token Error");
  }
   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
       method:'put',
       body:JSON.stringify({
        "count": count
       }),
       headers:{
         token: token as string,
         "content-type": "application/json",
       }
   })
   const data = await res.json();
   return data
}