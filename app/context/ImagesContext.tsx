'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ImagesContextProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

// create global context to be able to access images array 
const ImagesContext = createContext<ImagesContextProps | undefined>(undefined);

// set up ImagesContext.Provider to be able to wrap all of the children components in the context 
// in layout.tsx <ImagesProvider>{children}</ImagesProvider>
// and be able to update the images array in whatever component
export const ImagesProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<string[]>([]);
  return (
    <ImagesContext.Provider value={{ images, setImages }}>
      {children}
    </ImagesContext.Provider>
  );
};

// global useImages for any component to be able to access the images array
export const useImages = () => {
  const context = useContext(ImagesContext);
  if (!context) {
    throw new Error("useImages must be used within an ImagesProvider");
  }
  return context;
};
