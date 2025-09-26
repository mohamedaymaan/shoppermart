import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="my-40 p-10 flex flex-col">
          <Image
            src="/images/404NotFound.png"
            alt="Notfound"
            className="mb-12"
            width={800}
            height={800}
          />
          <p className="text-center mb-22 font-medium">
            Your visited page not found. You may go home page.
          </p>
          <Link href="/" className="">
            <Button className="bg-main w-[30%] cursor-pointer text-[20px] h-12 rounded-[5px] mx-auto block">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
