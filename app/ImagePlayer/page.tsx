"use client";
import Image from "next/image"; 
import { ImageItem } from "../types/image";

type ImagePlayerProps = {
  images: ImageItem[];
  currentImageIndex: number;
}

const ImagePlayer = ({ images, currentImageIndex }: ImagePlayerProps) => {
  if (images.length === 0) return <p className="text-gray-600">No images uploaded yet.</p>;

  console.log("currentImageIndex: " + currentImageIndex);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <div className="w-[30%] h-[30%] pb-16 flex items-center ">
        <Image
          src={images[currentImageIndex].url}
          alt={`Slide ${currentImageIndex}`}
          width={600} 
          height={600} 
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default ImagePlayer;
