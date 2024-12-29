//  'use client';
// import { useGlobalContext } from '../context/GlobalContext';
// import { Reorder } from "framer-motion" // npm install motion

// const reorder = () => {
//   const { images, setImages } = useGlobalContext();

//   return(
//     // NEED TO STYLE AND PROBABLY DO A GRID DRUM RACK LOOKING DISPLAY...
//     <div>
//       <ul>
//         {/* onReorder will have the reordered list so set the images array to the user's reordered list */}
//         <Reorder.Group values={images} onReorder={setImages}>
//           {images.map((img, index) => (
//             // wrap whatever part you want for the user to be able to click and drag with <Reorder.Item>
//             <Reorder.Item value={img} key={img.id}>
//               <li 
//                 style={{
//                   padding: '8px',
//                   margin: '4px 0',
//                   backgroundColor: '#f0f0f0',
//                   border: '1px solid #ccc',
//                   borderRadius: '4px',
//                   cursor: 'grab',
//                 }}
//               >
//                 <img
//                   src={img.url}
//                   alt="Uploaded"
//                   style={{ maxWidth: '100px', maxHeight: '100px' }}
//                 />
//               </li>
//             </Reorder.Item>
//           ))}
//         </Reorder.Group>
//       </ul>

//     </div>
//   )
// };

// export default reorder;

// ABOVE IS WORKING FINE JUST RESTYLING ETC BELOW
// ended up going with where the user 1st clicks the image that they want to move 
// and then clicks the position of where they want to insert the image that they're moving 
// and every other image index adjusts  
'use client';
import Link from 'next/link';
import { useGlobalContext } from '../context/GlobalContext';
// import { Reorder } from "framer-motion" // npm install motion
import ImageCard from './ImageCard';
import { useState } from 'react';

const reorder = () => {
  const { images, setImages } = useGlobalContext();
  const [ fromIndex, setFromIndex ] = useState<number | null>(null);
  const [ toIndex, setToIndex ] = useState<number | null>(null);
  const [ firstClickTurn, setFirstClickTurn ] = useState<boolean>(true);

    // handle the clicks on from and to image cards
    // so if the image that you are moving is of a higher index than the index that you are moving the image to
    // then the previous image at that index will increase by 1
    // and if the image that you are moving is of a lower index than the index that you are moving the image to
    // then the previous image at that index will decrease by 1
    const handleImageClick = (id: string, index: number) => {
      if (firstClickTurn) {
        setFromIndex(index);  // Set the fromIndex when the first image is clicked
        setFirstClickTurn(false);  // Set the flag to false after the first click
      } else {
        console.log('else index: ' + index);
        setToIndex(index);  // Set the toIndex when the second image is clicked
        if (fromIndex !== null && fromIndex !== index) {
          const updatedImages = [...images]; // make copy of original array
          const movedItem = updatedImages[fromIndex];
          // if the very last index of the image array, after removing the element from the from index 
          // the to index will be out of bounds so decrease by 1
          if (index == images.length) {
            updatedImages.splice(fromIndex, 1); // Remove the item from its original position
            // 1 less if the last index to avoid going out of bounds
            updatedImages.splice(index - 1, 0, movedItem); // Insert the item at the target position 
          }
          else {
            updatedImages.splice(fromIndex, 1); // Remove the item from its original position
            updatedImages.splice(index, 0, movedItem); // Insert the item at the target position
          }
          setImages(updatedImages); // Reorder the images
        }
        setFirstClickTurn(true);  // Reset flag for next round of clicks
        setFromIndex(null);  // Reset fromIndex after reordering
        setToIndex(null);    // Reset toIndex after reordering
      }

    };

  return(
    <div className='bg-gray-900 p-4'>
      <h1 className='text-center w-[60%] mx-auto text-[#00FFFF] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold'>Reorder Images</h1>
      <div className='w-[80%] md:w-[50%] mx-auto'>
        <p className='text-center mt-6 text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-bold text-opacity-60 transition-transform duration-300 animate-blink'>
          Click the image that you would like to move <br/>
          Then click the place in the sequence where you want the image to be placed
        </p>
        <div className='pt-8 text-center'>
        <Link href="/">
          <button className="px-8 py-4 bg-blue-500 text-white text-xl rounded hover:bg-blue-600">
            Home
          </button>
        </Link>
      </div>

      </div>

      {/* going with 2 columns on smaller and 4 on larger of whatever size */}
      <div className='mt-20 w-[80%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 items-center items-stretch'>
        {images.map((img, index) => (
          <ImageCard 
            key={img.id}
            imageInfo={img} 
            onClick={handleImageClick}  // Pass the click handler to ImageCard
            index={index}
          />
        ))}
      </div>

    </div>
  )
};

export default reorder;

