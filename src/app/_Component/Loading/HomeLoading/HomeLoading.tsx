import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <>
      {Array.from({ length: 8 }).map((item,i) => {
        return (
          <div key={i} className="flex flex-col space-y-4 my-5">
            <Skeleton className="h-[125px] bg-neutral-400 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px] bg-neutral-400" />
              <Skeleton className="h-4 w-[200px] bg-neutral-400" />
            </div>
          </div>
        );
      })}
    </>
  );
}
