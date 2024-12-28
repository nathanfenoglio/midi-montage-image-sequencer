"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ImageItem {
    id: string;
    url: string;
}

// interface for all of the useState variables that you will create global context for
interface GlobalContextProps {
//   images: string[];
  images: ImageItem[];
//   setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  selectedInputId: string | null;
  setSelectedInputId: React.Dispatch<React.SetStateAction<string | null>>;
  modByNumImages: boolean;
  setModByNumImages: React.Dispatch<React.SetStateAction<boolean>>;
  modByUserInput: number;
  setModByUserInput: React.Dispatch<React.SetStateAction<number>>;
  transpose: number;
  setTranspose: React.Dispatch<React.SetStateAction<number>>;
}

// use react's createContext function to create the global context for the interface props defined
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// export the global context provider for all files to be able to access 
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
//   const [images, setImages] = useState<string[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedInputId, setSelectedInputId] = useState<string | null>(null);
  const [modByNumImages, setModByNumImages] = useState(true);
  const [modByUserInput, setModByUserInput] = useState(128);
  const [transpose, setTranspose] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        images,
        setImages,
        selectedInputId,
        setSelectedInputId,
        modByNumImages,
        setModByNumImages,
        modByUserInput,
        setModByUserInput,
        transpose,
        setTranspose,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
