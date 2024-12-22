"use client"
import React, { useEffect, useState, useRef } from 'react'
// import Instructions from './Instructions/page'
import ImagePlayer from './ImagePlayer/page'

const HomePage = () => {
  const [images, setImages] = useState<string[]>([]); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // need useRef to make sure that images are uploaded before midi notes attempt to access image array
  const imagesRef = useRef<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false); 
  
  // transpose option shift all midi notes by specified amount
  const [transpose, setTranspose] = useState(0)
  const transposeRef = useRef<number>(0);

  // useRef to be able to control image display to be full screen or not
  const sliderRef = useRef<HTMLDivElement | null>(null); // Ref for the slider

  // mod by option to mod any midi note to fit within # of images that user has uploaded
  // does not guarantee an image will be displayed if midi note received is outside of array of images
  // when modByNumImages is toggled off 
  const [modByNumImages, setModByNumImages] = useState(true);
  const modByNumImagesRef = useRef<boolean>(true);

  const [modByUserInput, setModByUserInput] = useState(128);
  const modByUserInputRef = useRef<number>(null); 

  // toggle mod by # images
  const toggleModByNumImages = () => {
    setModByNumImages((prev) => !prev); 
  };

  // toggle play/stop
  const toggleSlideshow = () => {
    setIsPlaying((prev) => !prev); 
  };

  // put images uploaded by user in images array
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []); // convert FileList to an array
    // URL API is built in to the browser
    // it generates a temporary URL that represents the file's data as a Blob
    // the assigned URL can then be used to load the file into elements like nextjs Image
    const imageURLs = files.map((file) => URL.createObjectURL(file)); // Create object URLs
    setImages(imageURLs);
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

  // request access to receive MIDI from user
  // and connect to port 
  // using 01. Internal MIDI because that's what supercollider loopbemidi uses
  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then((midiAccess) => {
        // SHOULD PROBABLY POPULATE LIKE A DROP DOWN MENU FOR THE USER TO SELECT FROM THEIR AVAILABLE MIDI INPUTS...
        console.log("Available MIDI Inputs:");
        for (const input of midiAccess.inputs.values()) {
          console.log(`Name: ${input.name}, Manufacturer: ${input.manufacturer}`);
        }
  
        // connect to the specified port
        const targetInput = Array.from(midiAccess.inputs.values()).find(
          (input) => input.name === "01. Internal MIDI" // port name from SuperCollider
        );
  
        if (targetInput) {
          targetInput.onmidimessage = handleMIDIMessage;
          console.log(`Connected to: ${targetInput.name}`);
        } else {
          console.warn("Target MIDI port not found.");
        }
      });
    } else {
      console.warn("Web MIDI API not supported in this browser.");
    }
  }, []);
  
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
        // choosing to mod by THEN transpose
        const newIndex = (note % modByUserInputRef.current) + transposeRef.current;
        setCurrentImageIndex(newIndex);
        console.log("newIndex: " + newIndex);
      }
      else {
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
  const BPM: number = 80;

  // not needed for incoming midi notes but leaving because may use for option to specify note/duration pattern without incoming midi notes
  // durations
  const quarter: number = 1000 * (60/BPM);
  const quarter3plet: number = (2000 / 3) * (60/BPM);
  const eighth: number = 500 * (60/BPM);
  const eighth3plet: number = (1000 / 3) * (60/BPM);
  const sixteenth: number = 250 * (60/BPM);
  const sixteenth3plet: number = (500 / 3) * (60/BPM);
  const thirtysecond3plet: number = (250 / 3) * (60/BPM);
  // an array of durations
  const durations: number[] = [
    quarter,
    quarter,
    quarter,
    eighth3plet,
    eighth3plet,
    eighth3plet,
  ];
  // ***
  
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-4">Upload images to sequence</h1>

      {/* File Upload Input */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileUpload}
        className="mb-6 p-2 border border-gray-300 rounded"
      />

      {/* Transpose Input */}
      <label htmlFor="transpose-input" className="text-white mb-2">
        Transpose MIDI Notes:
      </label>
      <input
        id="transpose-input"
        type="number"
        value={transpose}
        onChange={(e) => setTranspose(Number(e.target.value))}
        className="mb-6 p-2 border border-gray-300 rounded"
      />

      {/* mod by # of images button */}
      {images.length > 0 && (
        <button
          onClick={toggleModByNumImages}
          className={`mb-4 px-4 py-2 rounded text-white ${
            modByNumImages ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {modByNumImages ? "No Mod By" : "Mod By # Images"}
        </button>
      )}

      <label htmlFor="modby-input" className="text-white mb-2">
        Mod By:
      </label>
      <input
        id="modby-input"
        type="number"
        value={modByNumImagesRef.current ? images.length : modByUserInput}
        onChange={(e) => {
          if (!modByNumImagesRef.current) {
            setModByUserInput(Number(e.target.value));
          }
        }}
        className="mb-6 p-2 border border-gray-300 rounded"
      />

      {/* start/stop button and fullscreen button on same line */}
      <div className='flex gap-4'>
        {/* Start/Stop Button */}
        {images.length > 0 && (
          <button
            onClick={toggleSlideshow}
            className={`px-4 py-2 rounded text-white ${
              isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`
            }
          >
            {isPlaying ? "Stop" : "Start"}
          </button>
        )}

        {/* Fullscreen Button */}
        {images.length > 0 &&
          <button
            onClick={makeFullScreen}
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer flex items-center justify-center"
          >
            Full Screen
          </button>
        }
      </div>

      {/* Image Slider */}
      <div ref={sliderRef} className="w-full max-w-4xl mt-4">
        {images.length > 0 ? (
          isPlaying ? (
            <ImagePlayer
              images={images}
              intervals={durations}
              currentImageIndex={currentImageIndex}
            />
          ) : (
            <p className="text-gray-500">Click Start to begin the slideshow.</p>
          )
        ) : (
          <p className="text-gray-500">Please upload images to start the slider.</p>
        )}
      </div>

    </div>
  )
}

export default HomePage
