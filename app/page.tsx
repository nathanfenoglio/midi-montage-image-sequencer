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

  // need useRef to make sure that images are uploaded before midi notes attempt to access image array
  useEffect(() => {
    imagesRef.current = images; // Sync ref with the latest images state
  }, [images]);

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
    const [command, note, velocity] = message.data;
  
    console.log(`Received MIDI message: Command=${command}, Note=${note}, Velocity=${velocity}`);
  
    if ((command & 0xf0) === 144 && velocity > 0) { // Note On
      console.log(`Images length: ${imagesRef.current.length}`);
      // console.log(`Images length: ${images.length}`);
      // const newIndex = note % images.length;
      const newIndex = note % imagesRef.current.length;
      console.log(note);
      console.log(newIndex);
      setCurrentImageIndex(newIndex);
    }
  };

  // Beats Per Minute
  const BPM: number = 80;

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

      {/* Start/Stop Button */}
      {images.length > 0 && (
        <button
          onClick={toggleSlideshow}
          className={`mb-4 px-4 py-2 rounded text-white ${
            isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isPlaying ? "Stop" : "Start"}
        </button>
      )}

      {/* Image Slider */}
      <div className="w-full max-w-4xl">
        {images.length > 0 ? (
          isPlaying ? (
            // <ImagePlayer images={images} intervals={durations} />
            <ImagePlayer images={images} intervals={durations} currentImageIndex={currentImageIndex}/>
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
