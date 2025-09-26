
import ProductDetailsCard from '@/app/_Component/ProductDetailsCard/ProductDetailsCard';
import { productDetails, ProductItem } from '@/types/productDetails.type';
import React from 'react'

export default async function ProductDetails({params}:{params:{id:string}}) {
    const {id} = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`)
    const data:productDetails = await res.json();
    const product:ProductItem = data.data;
  return (

    <>
    <ProductDetailsCard product ={product}/>
    </>
    
  )
}
