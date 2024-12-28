// 'use client';
// import { useGlobalContext } from '../context/GlobalContext';


// const reorder = () => {
//   // get images and setImages using global context 
//   const { images, setImages } = useGlobalContext();
  
//   // to be implemented still...
//   const handleReorder = (newOrder: string[]) => {
//     setImages(newOrder);
//   };

//   // just listing all images for now
//   // desire is to be able to have user grab and move to reorder list if they desire to...
//   return (
//     <div>
//       <h1>Reorder Images</h1>
//       <h1>{images.length}</h1>
//       <ul>
//         {images.map((img, index) => (
//           <li key={index}>{img}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default reorder;

'use client';
import { useGlobalContext } from '../context/GlobalContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = () => {
  const { images, setImages } = useGlobalContext();

  // Handle reordering logic
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // If dropped outside a valid area, do nothing.

    console.log('hello?');

    const newOrder = Array.from(images);
    const [movedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, movedItem);

    setImages(newOrder); // Update images with new order.
  };

  return (
    <div>
      <h1>Reorder Images</h1>
      <h2>Total Images: {images.length}</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="imageList">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyle: 'none', padding: 0 }}
            >
              {images.map((img, index) => (
                <Draggable
                  // key={`image-${index}`} // Use a unique string as the key
                  key={img.id} // Use a unique string as the key
                  // draggableId={`image-${index}`} // Same unique string for draggableId
                  draggableId={img.id} // Same unique string for draggableId
                  index={index}
                >
                {/* <Draggable key={img.id} draggableId={img.id} index={index}> */}
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        padding: '8px',
                        margin: '4px 0',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'grab',
                      }}
                    >
                      {/* {img} */}
                      <img
                        // src={img}
                        src={img.url}
                        // alt={`Image ${index}`}
                        alt="Uploaded"
                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default reorder;
