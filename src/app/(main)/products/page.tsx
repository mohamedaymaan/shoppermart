import ProductCard from '@/app/_Component/ProductCard/ProductCard';
import { product, ProductData } from '@/types/products.type';
import React from 'react'


export default async function Product() {
       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`);
       const data:ProductData = await res.json();
       const productList:product[] = data.data;
       
 
  return (
    <>
    <h1 className='text-main text-center text-4xl mb-10 font-semibold'>All Products</h1>
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
      {
      productList.map((product)=>{
        return <ProductCard key={product._id} product={product}/>
      })
    }
    </div>
    
    </>

  )
}