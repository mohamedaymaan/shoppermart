"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { cashOrder, checkoutPayment } from "@/OrderAction/OrderAction";
import { toast } from "sonner";
import { CountContext } from "@/CountProvider";
export default function CheckoutSession() {
  const CountData = useContext(CountContext);
  const { cartId }: { cartId: string } = useParams();
  const route = useRouter();

  const CheckoutSchema = z.object({
    details: z.string().nonempty("Details is Required"),
    phone: z
      .string()
      .nonempty("Phone Required")
      .regex(/(\+2)?^01[0125][0-9]{8}$/, "Enter Valid Phone"),
    city: z.string().nonempty("City is Required"),
  });
  const checkoutForm = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(CheckoutSchema),
  });
  async function CheckoutSessionPayment(values: {
    details: string;
    phone: string;
    city: string;
  }) {
    const data = await checkoutPayment(cartId, values);

    if (data?.status == "success") {
      window.open(data.session.url, "_blank");
    }
  }
  async function CashOrderPayment(values: {
    details: string;
    phone: string;
    city: string;
  }) {
    const data = await cashOrder(cartId, values);

    if (data?.status == "success") {
      toast.success("Your Payment is Successfully", { position: "top-center" });
      CountData?.setCount(0);
      route.push("/");
    }
  }

  return (
    <>
      <div className="w-4/5 m-auto">
        <h2 className="text-4xl font-medium mb-4">Shipping Address</h2>
        <p className="text-[20px] mb-4">Enter your details below</p>
        <Form {...checkoutForm}>
          <form>
            <FormField
              control={checkoutForm.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative z-0 w-full mb-5 group">
                      <textarea
                        {...field}
                        id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#db4444] peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#db4444] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                      >
                        Address Details*
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={checkoutForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        {...field}
                        type="text"
                        id="floating_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#db4444] peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#db4444] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        City*
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={checkoutForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        {...field}
                        type="text"
                        id="floating_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#db4444] peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#db4444] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Phone Number*
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col justify-end items-end">
              <Button
                onClick={checkoutForm.handleSubmit(CheckoutSessionPayment)}
                className="w-[45%] bg-main rounded-[2px] cursor-pointer mt-3"
              >
                Proceed Payment
              </Button>
              <Button
                onClick={checkoutForm.handleSubmit(CashOrderPayment)}
                className="w-[45%] bg-main rounded-[2px] cursor-pointer mt-3"
              >
                Pay with Cash
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
