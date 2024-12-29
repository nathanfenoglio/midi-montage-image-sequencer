import React from 'react'
import { ImageItem } from "../types/image";
import Image from 'next/image';

interface ImageCardProps {
    imageInfo: ImageItem
    onClick: (id: string, index: number) => void;  // Add the onClick handler
    index: number;
}

const ImageCard = ({ imageInfo, onClick, index }: ImageCardProps) => {
  const { id, url } = imageInfo;
  return (
    <div className='p-6 hover:bg-blue-900 duration-300 transition-all cursor-pointer text-center rounded-lg bg-gray-900 h-full flex flex-col justify-between'
      onClick={() => onClick(id, index)}  // Trigger the onClick function when the card is clicked
    >
      <Image src={url} alt={id} width={180} height={180} className='mx-auto object-cover'/>
      <h1 className='text-[18px] mt-4 text-white font-[600]'>{index}</h1>
    </div>
  )
}

export default ImageCard