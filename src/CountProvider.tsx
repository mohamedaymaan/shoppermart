'use client'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { getUserToken } from "./getUserToken";
import { CartData } from "./types/cart.type";
import { getCartData } from "./CartAction/CartAction";
interface UserContextType {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

export const CountContext = createContext<UserContextType | null>(null);

export default function CountProvider({children}:{children:React.ReactNode}){
    const [count , setCount] = useState<number>(0)


   async function getCart(){
        const token =  await getUserToken();
        if(token){
            const data:CartData = await getCartData();

            const sum = data.data.products.reduce((total,item)=> total += item.count,0);

            setCount(sum)
        }
    }

    useEffect(()=>{
        getCart()
    },[])
    return <CountContext.Provider value={{count,setCount}}>
    {children}
    
    </CountContext.Provider>
}


