"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const ResetPasswordSchema = z.object({
    email: z
      .email("Email is Invalid")
      .nonempty("Email is Required")
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    newPassword: z
      .string()
      .nonempty("newPassword is Required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Enter Valid Password"
      ),
  });
  let ResetPasswordForm = useForm({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
  });
  const Route = useRouter();

  async function handleResetPassword(
    values: z.infer<typeof ResetPasswordSchema>
  ) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "put",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);

    if (data?.token) {
      toast.success("Change Password Successfully!", {
        position: "top-center",
      });
      Route.push("/login");
    } else {
      toast.error(data.message, { position: "top-center" });
    }
  }

  return (
    <>
      <div className="w-4/5 m-auto">
        <div className="grid grid-cols-12 gap-4 items-center space-x-12">
          <div className="col-span-7 me-20 ">
            <Image
              src="/images/authImg.png"
              alt=""
              width={500}
              height={500}
              className="w-full rounded-[8px]"
            />
          </div>
          <div className="col-span-4">
            <h2 className="text-4xl font-medium mb-4">Change your password</h2>
            <p className="text-[20px] mb-4">Enter your details below</p>
            <Form {...ResetPasswordForm}>
              <form
                onSubmit={ResetPasswordForm.handleSubmit(handleResetPassword)}
              >
                <FormField
                  control={ResetPasswordForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            {...field}
                            type="email"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#db4444] peer"
                            placeholder=" "
                          />
                          <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#db4444] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                          >
                            Email
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={ResetPasswordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            {...field}
                            type="password"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#db4444] peer"
                            placeholder=" "
                          />
                          <label
                            htmlFor="floating_password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#db4444] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            New Password
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full bg-main rounded-[2px] cursor-pointer mt-3">
                  Reset Password
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
