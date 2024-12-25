'use client';
import { useImages } from '../context/ImagesContext'; // useImages global context

const reorder = () => {
  // get images from ImagesContext that uses useContext React hook
  const { images, setImages } = useImages();
  
  // to be implemented still...
  const handleReorder = (newOrder: string[]) => {
    setImages(newOrder);
  };

  // just listing all images for now
  // desire is to be able to have user grab and move to reorder list if they desire to...
  return (
    <div>
      <h1>Reorder Images</h1>
      <h1>{images.length}</h1>
      <ul>
        {images.map((img, index) => (
          <li key={index}>{img}</li>
        ))}
      </ul>
    </div>
  );
};

export default reorder;
