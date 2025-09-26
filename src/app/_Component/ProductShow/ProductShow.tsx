import Image from "next/image";
import React from "react";

export default function ProductShow({ imagess }: { imagess: string[] }) {
  return (
    <>
      <div>
        {imagess.slice(0,4).map((img) => {
          return (
            <div key={img} className="space-y-7">
              <Image
                src={img}
                alt={img}
                width={500}
                height={500}
                className="w-full h-36 object-cover bg-neutral-200 mb-4 rounded-[6px]"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
