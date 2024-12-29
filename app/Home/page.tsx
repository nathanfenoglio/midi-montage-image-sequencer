"use client"
import React, { useEffect, useState, useRef } from 'react'
// import Instructions from './Instructions/page'
import ImagePlayer from '../ImagePlayer/page'
import Link from 'next/link';
// global context variables to persist when navigating to different pages
import { useGlobalContext } from '../context/GlobalContext'; 

const HomePage = () => {
  interface ImageItem {
    id: string;
    url: string;
  }
  // get all global values into their respective variables
  const {
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
  } = useGlobalContext();

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // doesn't need to persist globally like many of the other variables
  const currentImageIndexRef = useRef<number>(0);

  // need useRef to make sure that images are uploaded before midi notes attempt to access image array
  const imagesRef = useRef<ImageItem[]>([]);
  const [isPlaying, setIsPlaying] = useState(false); 

  // user to be able to select from available midi inputs 
  const [midiInputs, setMidiInputs] = useState<WebMidi.MIDIInput[]>([]);
  
  // transpose option shift all midi notes by specified amount
  const transposeRef = useRef<number>(0);

  // useRef to be able to control image display to be full screen or not
  const sliderRef = useRef<HTMLDivElement | null>(null); // Ref for the slider

  // mod by option to mod any midi note to fit within # of images that user has uploaded
  // when modByNumImages is toggled off 
  // will mod by # of images after mod by THEN transpose operation is performed to avoid any possibility of index out of images array range 
  const modByNumImagesRef = useRef<boolean>(true);
  const modByUserInputRef = useRef<number>(null); 

  // toggle mod by # images
  const toggleModByNumImages = () => {
    setModByNumImages((prev) => !prev); 
  };

  // toggle play/stop
  const toggleSlideshow = () => {
    console.log("isPlaying: " + isPlaying);
    setIsPlaying((prev) => !prev); 
  };

  // put images uploaded by user in images array
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []); // Convert FileList to an array
    
    let counter: number = 1;
    // Map files to objects with unique IDs and blob URLs
    const newImages = files.map((file) => ({
      // id: `image-${Date.now()}-${Math.random()}`, // Generate unique ID
      id: `image-${Date.now()}-${Math.random()}-${counter++}`, // Generate unique ID
      // URL API is built in to the browser
      // it generates a temporary URL that represents the file's data as a Blob
      // the assigned URL can then be used to load the file into elements like nextjs Image
      url: URL.createObjectURL(file), // Generate blob URL
    }));
  
    // Update state and ref
    // needed to do it this way and just jump ahead and update imagesRef before useEffect would 
    // so that imagesRef would be updated right away to display # of files uploaded correctly 
    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...newImages];
      imagesRef.current = updatedImages; // Update the ref immediately
      return updatedImages;
    });
  };

  const makeFullScreen = () => {
    sliderRef.current?.requestFullscreen();
  };

  // need useRef to make sure that images and whatever other user specified info is uploaded before midi notes attempt to access image array
  useEffect(() => {
    imagesRef.current = images; 
  }, [images]);

  useEffect(() => {
    transposeRef.current = transpose;
  }, [transpose]);

  useEffect(() => {
    modByNumImagesRef.current = modByNumImages; 
  }, [modByNumImages]);

  useEffect(() => {
    modByUserInputRef.current = modByUserInput;
  }, [modByUserInput]);

  useEffect(() => {
    currentImageIndexRef.current = currentImageIndex;
  }, [currentImageIndex]);

  // needed to reassign midi handler for WEB MIDI API onmidimessage when user returns from another page
  useEffect(() => {
    // call handleMidiInputChange when page is returned to
    if (selectedInputId) {
      // simulate a react change event with the current selectedInputId and send to handleMidiInputChange handler
      handleMidiInputChange({ target: { value: selectedInputId } } as React.ChangeEvent<HTMLSelectElement>);
    }
  }, [midiInputs, selectedInputId]);

  // request access to receive MIDI from user
  // and save available midi inputs in array to display for user to select 
  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then((midiAccess) => {
        // save all available midi inputs in array to display in drop down menu for user to select
        const inputs = Array.from(midiAccess.inputs.values());
        setMidiInputs(inputs);

        // if new available midi input is detected, update midi inputs array
        midiAccess.onstatechange = () => {
          setMidiInputs(Array.from(midiAccess.inputs.values()));
        };

        // just printing all of the available attributes of a MIDIInput object
        midiAccess.inputs.forEach((input) => {
          console.log(`ID: ${input.id}`);
          console.log(`Name: ${input.name}`);
          console.log(`Manufacturer: ${input.manufacturer}`);
          console.log(`Type: ${input.type}`);
          console.log(`Version: ${input.version}`);
          console.log(`State: ${input.state}`);
          console.log(`Connection: ${input.connection}`);
        });
      });
    } 
    else {
      console.warn("Web MIDI API not supported in this browser.");
    }
  }, []);

  // midi input selection change handler
  const handleMidiInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const inputId = event.target.value;

    // clear the listener for the previously selected input if input was previously selected
    if (selectedInputId) {
      const previousInput = midiInputs.find((input) => input.id === selectedInputId);
      if (previousInput) {
        previousInput.onmidimessage = null; // remove previous listener by selecting null instead of your event handler handleMIDIMessage 
        console.log(`Disconnected from: ${previousInput.name}`);
      }
    }

    // set input id to new input id selected by user
    setSelectedInputId(inputId);

    // listen and handle midi messages from user specified input
    // for you selectedInput that you use for supercollider out is 01. Internal MIDI
    const selectedInput = midiInputs.find((input) => input.id === inputId);
    if (selectedInput) {
      // WEB MIDI API onmidimessage allows you to assign an event handler function to be used for incoming midi messages 
      selectedInput.onmidimessage = handleMIDIMessage;
      console.log(`Connected to: ${selectedInput.name}`);
    }    

    // just printing all of the available attributes of a MIDIInput object
    // it's always one behind the actual state but just printing so leaving alone 
    midiInputs.forEach((input) => {
      console.log(`ID: ${input.id}`);
      console.log(`Name: ${input.name}`);
      console.log(`Manufacturer: ${input.manufacturer}`);
      console.log(`Type: ${input.type}`);
      console.log(`Version: ${input.version}`);
      console.log(`State: ${input.state}`);
      console.log(`Connection: ${input.connection}`);
    });
    
  };
  
  const handleMIDIMessage = (message: WebMidi.MIDIMessageEvent) => {
    // destructure midi note message
    const [command, note, velocity] = message.data;
  
    console.log(`Received MIDI message: Command=${command}, Note=${note}, Velocity=${velocity}`);
  
    // 0xf0 11110000 to mask and get the upper 4 bits of the command part of the midi message to check if note on
    // 10010000 is 144 and represents note on
    if ((command & 0xf0) === 144 && velocity > 0) { // Note On
      console.log(`Images length: ${imagesRef.current.length}`);

      // mod note by # of images or not based on user toggle button
      if (modByNumImagesRef.current) {
        const newIndex = (note + transposeRef.current) % imagesRef.current.length;
        setCurrentImageIndex(newIndex);
        console.log("newIndex: " + newIndex);
      }
      // option for user specified mod by #
      else if (modByUserInputRef.current != null) {
        console.log("note: " + note);
        console.log("modByNumImagesRef.current: " + modByNumImagesRef.current);
        console.log("transposeRef.current: " + transposeRef.current);
        // choosing to mod by THEN transpose
        // and THEN mod by the # of images so that never out of bounds
        const newIndex = ((note % modByUserInputRef.current) + transposeRef.current) % imagesRef.current.length;
        if (newIndex >= 0) {
          setCurrentImageIndex(newIndex);
        }
        else { // make sure new index is not less than 0, if < 0 set to 0
          setCurrentImageIndex(0);
          console.log("specified index < 0, setting index to 0");
        }
        console.log("newIndex: " + newIndex);
      }
      else { // NOT REALLY SURE WHY WE WOULD GET HERE...
        const newIndex = (note + transposeRef.current);
        setCurrentImageIndex(newIndex);
        console.log("newIndex: " + newIndex);
      }

      console.log(note);
      console.log("transposeRef.current: " + transposeRef.current);
    }
  };
 
  // Beats Per Minute
  // will not be used when receiving midi data from user as the tempo will be controlled by whatever is received in real time
  // ***
  // const BPM: number = 80;

  // not needed for incoming midi notes but leaving because may use for option to specify note/duration pattern without incoming midi notes
  // durations
  // const quarter: number = 1000 * (60/BPM);
  // const quarter3plet: number = (2000 / 3) * (60/BPM);
  // const eighth: number = 500 * (60/BPM);
  // const eighth3plet: number = (1000 / 3) * (60/BPM);
  // const sixteenth: number = 250 * (60/BPM);
  // const sixteenth3plet: number = (500 / 3) * (60/BPM);
  // const thirtysecond3plet: number = (250 / 3) * (60/BPM);
  // // an array of durations
  // const durations: number[] = [
  //   quarter,
  //   quarter,
  //   quarter,
  //   eighth3plet,
  //   eighth3plet,
  //   eighth3plet,
  // ];
  // ***
  
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-900 p-4">
      {/* see about moving image display to top eh it pushes everything else off of the screen */}

      <div className='mt-[2vh] mb-[6vh] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold'>
        <h1 className='text-center w-[60%] mx-auto text-[#00FFFF]'>Midi Montage Image Sequencer</h1>
      </div>

      {/* MIDI Input Selection drop down menu */}
      <div className="mb-4 w-[95%] md:w-[50%] items-start md:text-center">
        <label className="text-white mr-2 text-lg lg:text-3xl xl:text-2xl">Select MIDI Input Port:</label>
        <select
          onChange={handleMidiInputChange}
          value={selectedInputId || ''}
          className="p-2 border border-gray-300 rounded bg-[#00FFFF] text-md lg:text-lg xl:text-sm"
        >
          <option value="">-- Select Input --</option>
          {midiInputs.map((input) => (
            <option key={input.id} value={input.id}>
              {input.name}
            </option>
          ))}
        </select>
      </div>

      {/* items-start will move all children elements to the left */}
      <div className='flex gap-4 w-[95%] md:w-[50%] items-start md:flex-row md:items-center md:justify-center mb-4'>
        {/* File Upload Input */}
        <label className='inline-block px-6 py-3 bg-blue-500 text-white text-lg lg:text-3xl xl:text-2xl font-semibold text-center rounded cursor-pointer hover:bg-blue-600'>
          Choose Files To Sequence
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            // className="mb-6 p-2 border border-gray-300 rounded"
            className="hidden"
          />
        </label>
        <p className='text-white text-lg lg:text-3xl xl:text-2xl'>{imagesRef.current.length} files uploaded</p>
      </div>

      {/* modby # user input and toggle modby num images on same line */}
      <div className="flex w-[95%] md:w-[50%] gap-4 mb-4 items-start md:flex-row md:items-center md:justify-center">
        <label htmlFor="modby-input" className="text-white text-lg lg:text-3xl xl:text-2xl">
          Mod By:
        </label>
        <input
          id="modby-input"
          type="number"
          value={modByNumImagesRef.current ? images.length : modByUserInput}
          onChange={(e) => {
            if (!modByNumImagesRef.current) {
              const newValue = Number(e.target.value);
              setModByUserInput(newValue);
              modByUserInputRef.current = newValue;
            }
          }}
          className="p-2 mr-6 border border-gray-300 rounded bg-[#00FFFF] w-16 text-md lg:text-2xl xl:text-xl"
        />

        {/* mod by # of images checkbox */}
        {images.length > 0 && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={modByNumImages}
              onChange={() => {
                toggleModByNumImages();
                if (!modByNumImages) {
                  // Switching to mod by # images
                  const newValue = images.length;
                  setModByUserInput(newValue); // Update the displayed value
                  modByUserInputRef.current = newValue; // Update the reference value
                }
              }}
              className="w-10 h-10 lg:w-10 lg:h-10 xl:w-7 xl:h-7 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-white text-lg lg:text-3xl xl:text-2xl">Mod By # Images</span>
          </label>
        )}

      </div>

      {/* transpose midi notes label and input */}
      <div className='flex w-[95%] md:w-[50%] gap-4 mb-4 items-start md:flex-row md:items-center md:justify-center'>
        {/* Transpose Input */}
        <label htmlFor="transpose-input" className="text-white text-lg lg:text-3xl xl:text-2xl">
          Transpose MIDI Notes:
        </label>
        <input
          id="transpose-input"
          type="number"
          value={transpose}
          onChange={(e) => setTranspose(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded bg-[#00FFFF] w-16 text-md lg:text-2xl xl:text-xl"
        />
      </div>

      {/* start/stop button and fullscreen button and reorder images button on same line */}
      <div className='flex gap-4 w-[95%] lg:w-[50%] justify-center mt-2'>
        {/* Start/Stop Button */}
        {images.length > 0 && (
          <button
            onClick={toggleSlideshow}
            className={`w-32 h-12 lg:w-36 lg:h-14 xl:w-32 xl:h-12 rounded text-white text-md lg:text-xl xl:text-lg flex items-center justify-center ${
              isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isPlaying ? "Stop" : "Start"}
          </button>
        )}

        {/* Fullscreen Button */}
        {images.length > 0 &&
          <button
            onClick={makeFullScreen}
            className="w-32 h-12 lg:w-36 lg:h-14 xl:w-32 xl:h-12 bg-blue-500 text-white text-md lg:text-xl xl:text-lg rounded cursor-pointer flex items-center justify-center hover:bg-blue-600"
          >
            Full Screen
          </button>
        }

        {/* Reorder Images Screen Button */}
        <Link href="/reorder">
          <button className="w-32 h-12 lg:w-36 lg:h-14 xl:w-32 xl:h-12 bg-orange-500 text-white text-md lg:text-xl xl:text-lg rounded flex items-center justify-center hover:bg-orange-600">
            Reorder Images
          </button>
        </Link>

      </div>

      {/* Image Player */}
      <div ref={sliderRef} className="w-full max-w-4xl mt-4">
        {images.length > 0 && isPlaying && (
            <ImagePlayer
              images={images}
              // intervals={durations}
              // just passing empty array because not using duration intervals right now 
              intervals={[]}
              currentImageIndex={currentImageIndexRef.current}
            />
          ) 
        }
      </div>

    </div>
  )
}

export default HomePage
