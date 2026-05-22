"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export default function Carousel({}: Props) {

  return (
    <div className=" w-full h-full mx-auto font-poppins">
      <div className="flex flex-col space-y-6">
        <div className="w-full mx-auto h-full">
          <div className="flex flex-col items-center text-white mt-16">
            <Image
              src="/assets/welcome-image.jpg"
              alt="this is the image"
              className="w-auto h-[350px] object-cover py-1"
              width={300}
              height={100}
            />
          </div>
          <div className="w-[75%] mx-auto mt-4">
            <div className="flex flex-col justify-center items-center font-roboto text-onSurfaceVariant p-4">
              <h2 className="text-2xl text-center py-3 px-4 font-semibold">
              Welcome to Anon Whisper
              </h2>
              <p className="text-center text-sm py-6 px-2 mb-3">
                This is the easily submit complaints while keeping your identity to yourself

              </p>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}
