'use client'
import { AddProductToCart } from '@/CartAction/CartAction'
import { Button } from '@/components/ui/button'
import { CountContext } from '@/CountProvider';
import React, { useContext } from 'react'
import { toast } from 'sonner';

export default function AddCartButton({id}:{id:string}) {
  const CountData = useContext(CountContext);

      async function addProduct(id:string){
       const data = await AddProductToCart(id);
       if(data?.status=='success'){
           toast.success(data.message,{position:'top-center'})
            const sum = data.data.products.reduce((total: number,item: { count: number; })=> total += item.count,0);

            CountData?.setCount(sum) 
       }else{
        toast.error('Incorrect Id',{position:'top-center'})
       }
      }

  return (
    <>
    <Button onClick={()=>addProduct(id)} className="w-full cursor-pointer">Add to Cart</Button>
    </>
  )
}
