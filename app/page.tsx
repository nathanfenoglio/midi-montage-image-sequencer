"use client"
import React, { useEffect, useState } from 'react'
// import Instructions from './Instructions/page'
import ImagePlayer from './ImagePlayer/page'

const HomePage = () => {
  const [images, setImages] = useState<string[]>([]); // State for uploaded images
  const [isPlaying, setIsPlaying] = useState(false); // State for slideshow play/stop

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleSlideshow = () => {
    setIsPlaying((prev) => !prev); // Toggle the play/stop state
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []); // Convert FileList to an array
    // URL API is built in to the browser
    // it generates a temporary URL that represents the file's data as a Blob
    // the assigned URL can then be used to load the file into elements like nextjs Image
    const imageURLs = files.map((file) => URL.createObjectURL(file)); // Create object URLs
    setImages(imageURLs);
  };

  // Initialize MIDI
  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then((midiAccess) => {
        for (const input of midiAccess.inputs.values()) {
          input.onmidimessage = handleMIDIMessage;
        }
      });
    } else {
      console.warn("Web MIDI API not supported in this browser.");
    }
  }, []);

  // Handle MIDI Message
  // npm install --save-dev @types/webmidi
  const handleMIDIMessage = (message: WebMidi.MIDIMessageEvent) => {
    const [command, note] = message.data;

    // Note On (command 144)
    if (command === 144) {
      const newIndex = note % images.length; // Map note to image index
      setCurrentImageIndex(newIndex);
    }
  };

  console.log(currentImageIndex);
  
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
