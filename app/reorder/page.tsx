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
    <div>
      <ul>
          <div className='mt-20 w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center items-stretch'>
            {images.map((img, index) => (
              <ImageCard 
                key={img.id}
                imageInfo={img} 
                onClick={handleImageClick}  // Pass the click handler to ImageCard
                index={index}
              />
            ))}
          </div>
      </ul>

    </div>
  )
};

export default reorder;

