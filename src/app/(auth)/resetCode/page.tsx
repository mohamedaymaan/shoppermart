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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function ResetCode() {
  const ResetCodeSchema = z.object({
    resetCode: z.string().nonempty("Resetcode is Required"),
  });
  const ResetForm = useForm({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(ResetCodeSchema),
  });
  const Route = useRouter();

  async function handleResetCode(values: z.infer<typeof ResetCodeSchema>) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,
      {
        method: "post",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      toast.success("Reset Code is correct!", {
        position: "top-center",
      });
      Route.push("/changePassword");
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
            <h2 className="text-4xl font-medium mb-4">Reset Code</h2>
            <p className="text-[18px] mb-4">
              Enter the code that sent to your email
            </p>
            <Form {...ResetForm} >
              <form onSubmit={ResetForm.handleSubmit(handleResetCode)}>
                <FormField
                  control={ResetForm.control}
                  name="resetCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP {...field} maxLength={6}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full bg-main rounded-[2px] cursor-pointer mt-3">
                  Verfiy Code
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
