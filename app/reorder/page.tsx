 'use client';
import { useGlobalContext } from '../context/GlobalContext';
import { Reorder } from "framer-motion" // npm install motion

const reorder = () => {
  const { images, setImages } = useGlobalContext();

  return(
    // NEED TO STYLE AND PROBABLY DO A GRID DRUM RACK LOOKING DISPLAY...
    <div>
      <ul>
        {/* onReorder will have the reordered list so set the images array to the user's reordered list */}
        <Reorder.Group values={images} onReorder={setImages}>
          {images.map((img, index) => (
            // wrap whatever part you want for the user to be able to click and drag with <Reorder.Item>
            <Reorder.Item value={img} key={img.id}>
              <li 
                style={{
                  padding: '8px',
                  margin: '4px 0',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'grab',
                }}
              >
                <img
                  src={img.url}
                  alt="Uploaded"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              </li>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </ul>

    </div>
  )
};

export default reorder;
