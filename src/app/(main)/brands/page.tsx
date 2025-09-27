import { getServerSession } from "next-auth";
import React from "react";
import { NextOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function page() {
  const x = await getServerSession(NextOptions);
  console.log(x);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="text-6xl text-main">Pending..........</div>
      </div>
    </>
  );
}
