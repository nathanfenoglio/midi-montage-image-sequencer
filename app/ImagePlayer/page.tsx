"use client";
// import { useState, useEffect } from "react";
import Image from "next/image"; // Use Next.js Image for better performance

type ImagePlayerProps = {
  images: string[];
  intervals: number[];
  currentImageIndex: number;
}
const ImagePlayer = ({ images, intervals, currentImageIndex }: ImagePlayerProps) => {
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [currentIntervalIndex, setCurrentIntervalIndex] = useState(0);
  // so if you are able to receive midi notes, then you I suppose don't need to worry about the interval duration 
  // since it will be determined by the midi note being received
  // useEffect(() => {
  //   // Set up an interval to update the current image index
  //   const timer = setInterval(() => {
  //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  //     setCurrentIntervalIndex((prevIndex) => (prevIndex + 1) % intervals.length);
  //   }, intervals[currentIntervalIndex]);

  //   // Clean up the interval when the component unmounts
  //   return () => clearInterval(timer);
  // }, [images.length, currentImageIndex, intervals, currentIntervalIndex]);

  if (images.length === 0) return <p className="text-gray-600">No images uploaded yet.</p>;

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <div className="w-[30%] h-[30%] pt-16 pb-16 flex items-center ">
        <Image
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex}`}
          width={600} // Adjust width based on your requirements
          height={600} // Adjust height based on your requirements
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default ImagePlayer;
