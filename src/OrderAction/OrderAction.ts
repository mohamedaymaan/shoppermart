"use server";

import { getCartData } from "@/CartAction/CartAction";
import { getUserToken } from "@/getUserToken";
import { CartData } from "@/types/cart.type";

export async function checkoutPayment(
  cardId: string,
  shippingData: { details: string; phone: string; city: string }
) {
  const token: any = await getUserToken();
  if (!token) {
    throw new Error("token Error");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cardId}?url=${process.env.NEXTAUTH_URL}`,
    {
      method: "post",
      body: JSON.stringify({
        shippingAddress: shippingData,
      }),
      headers: {
        "content-type": "application/json",
        token: token,
      },
    }
  );
  const data = await res.json();
  return data;
}


export async function cashOrder(
  cardId: string,
  shippingData: { details: string; phone: string; city: string }
) {
  const token: any = await getUserToken();
  if (!token) {
    throw new Error("token Error");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cardId}`,
    {
      method: "post",
      body: JSON.stringify({
        shippingAddress: shippingData,
      }),
      headers: {
        "content-type": "application/json",
        token: token,
      },
    }
  );
  const data = await res.json();
  return data;
}


// export async function getOrder() {
//   const cartData = await getCartData();
//   const cartId = cartData.data.cartOwner;
//   console.log(cartId)
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${cartId}`);
//   const data = await res.json();
//   console.log(data);
  
// }
