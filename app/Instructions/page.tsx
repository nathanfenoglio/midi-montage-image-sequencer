import Image from 'next/image'
import React from 'react'

const Instructions = () => {
  return (
    <div className='pb-16 bg-gradient-to-r from-black via-purple-500 to-grey-500 text-white overflow-hidden'>
      <div data-aos='fade-right' data-aos-delay='100' className='mt-[2vh] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold'>
        <h1 className='text-center w-[60%] mx-auto text-[#00FFFF]'>Midi Montage Image Sequencer</h1>
      </div>

      {/* app description */}
      <div data-aos='fade-left' data-aos-delay='100' className='w-[80%] lg:w-[50%] xl:w-[40%] pl-2 xl:pl-6 mx-auto text-center text-lg md:text-xl text-opacity-60 font-bold text-white space-y-4'>
        <p className='mt-6'>Instantly sync midi notes with mapped images in real time</p>
        <p>for live performance or visual montage composition</p>
      </div>

      <div className='mt-6 w-[80%] mx-auto flex flex-col items-center justify-center'>
        <a
          href='../Home'
          className="mb-4 w-32 h-12 lg:w-36 lg:h-14 xl:w-32 xl:h-12 bg-orange-500 text-white text-md lg:text-xl xl:text-lg rounded cursor-pointer flex items-center justify-center hover:bg-blue-600"
        >
          Home
        </a>
      </div>

      <div className='mt-6 w-[80%] mx-auto flex flex-col items-center justify-center'>
        <a
          href='https://www.nathan-fenoglio.com/'
          className="text-[#00FFFF] text-xl lg:text-3xl xl:text-4xl hover:bg-blue-600 p-4"
        >
          nathan-fenoglio.com
        </a>
      </div>

      {/* Instructions */}
      <div className='w-[80%] mx-auto flex flex-col items-center justify-center'>
        <h2 className='text-center text-lime-400 mt-[3vh] lg:mb-[3vh] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold'>Instructions</h2>
        <div className='w-[80%] mx-auto text-center text-lg md:text-xl text-opacity-60 font-bold text-white'>
          {/* select midi input port */}
          <p className='mt-6'>select midi input port or midi controller device from drop down menu</p>
          <p>(need ports set up on computer, I use LoopBe30 for windows os)</p>
          <a href='https://www.nerds.de/en/loopbe30.html' target='_blank'>https://www.nerds.de/en/loopbe30.html</a>
          <div className='relative w-full h-[300px] overflow-hidden rounded-lg md:mt-6'>
            <Image src='/images/midi_image_seq_1.png' alt='midi_image_seq_1' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>
          {/* select image files */}
          <p className='md:mt-12'>select image files to sequence from your device</p>
          <div className='relative w-full h-[500px] overflow-hidden rounded-lg md:mt-6'>
            <Image src='/images/midi_image_seq_2.png' alt='midi_image_seq_2' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>
          <div className='relative w-full h-[300px] overflow-hidden rounded-lg mt-6'>
            <Image src='/images/midi_image_seq_3.png' alt='midi_image_seq_3' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>
          {/* send midi */}
          <div className='w-[80%] lg:w-[50%] xl:pl-6 mx-auto text-start text-lg md:text-xl text-opacity-60 font-bold text-white'>
            {/* list-disc enables bullet points, pl-5 enables left padding to have text wrap around under bullet point to be aligned with text next to bullet point */}
            <ul className='list-disc pl-5 space-y-4'>
              <li className='mt-12'>set up midi send from daw or through internal routing in computer</li>
              <li>send midi to midi input port selected from drop down</li>
              <li>can use prewritten midi notes or played real time with whatever midi controller device that you have configured</li>
            </ul>
          </div>
          {/* example sending midi from daw */}
          <p className='mt-12 text-center'>example sending midi from Ableton Live</p>
          <div className='relative w-full h-[500px] overflow-hidden rounded-lg mt-6'>
            <Image src='/images/midi_image_seq_4.png' alt='midi_image_seq_4' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>
          {/* example sending midi from Supercollider */}
          <p className='mt-12'>example sending midi from Supercollider</p>
          <div className='relative w-full h-[300px] overflow-hidden rounded-lg md:mt-6'>
            <Image src='/images/midi_image_seq_5.png' alt='midi_image_seq_5' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>
          {/* display images triggered by incoming midi notes */}
          <p className='mt-12'>click Start button to display images triggered by incoming midi notes</p>
          <div className='relative w-full h-[500px] overflow-hidden rounded-lg mt-6'>
            <Image src='/images/midi_image_seq_6.png' alt='midi_image_seq_6' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>
          <div className='w-[80%] lg:w-[50%] xl:pl-6 mx-auto text-start text-lg md:text-xl text-opacity-60 font-bold text-white'>
            <ul className='list-disc pl-5 space-y-4'>
              <li className='md:mt-12'>images will display in real time with midi notes received by app</li>
              <li>click on Full Screen to have image player fill screen to display in sync with music during live performance</li>
            </ul>
          </div>
          <div className='relative w-full h-[200px] overflow-hidden rounded-lg mt-6'>
            <Image src='/images/midi_image_seq_7.png' alt='midi_image_seq_7' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>

          {/* Mod By / Mod By # Images */}
          <h1 className='text-[#FFD700] text-3xl sm:text-4xl md:text-5xl mt-12'>Mod By / Mod By # Images</h1>
          {/* space-y-4 on the parent div for all of the list elements to control the spacing in between each list item */}
          <div className='w-[80%] lg:w-[50%] pl-2 mt-6 xl:pl-6 mx-auto text-start text-lg md:text-xl text-opacity-60 font-bold text-white'>
            <ul className='list-disc pl-5 space-y-4'>
              <li>&quot;Mod By&quot; specifies what the incoming midi note will be modded by (remainder after division)</li>
              <li>for example incoming midi note of 67 with &quot;Mod By&quot; set at 64 will trigger image 3 in images array 67 % 64 = 3</li>
              <li>&quot;Mod By&quot; is by default set to the # of images that the user uploaded</li>
              <li>to specify custom &quot;Mod By&quot; value, uncheck &quot;Mod By # Images&quot; checkbox</li>
              <li>and input new value for &quot;Mod By&quot;</li>
              <li>this value can be used to experiment with to produce patterns with varying range constrained by the &quot;Mod By&quot; value</li>
            </ul>
          </div>
          <div className='relative w-full h-[500px] overflow-hidden rounded-lg md:mt-6'>
            <Image src='/images/midi_image_seq_8.png' alt='midi_image_seq_8' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>

          {/* Transpose MIDI Notes */}
          <h1 className='text-[#FFD700] text-3xl sm:text-4xl md:text-5xl mt-12'>Transpose MIDI Notes</h1>
          <div className='w-[80%] lg:w-[50%] pl-2 xl:pl-6 mx-auto text-start text-lg md:text-xl text-opacity-60 font-bold text-white'>
            <ul className='list-disc pl-5 space-y-4'>
              <li className='mt-12'>parameter for user to specify the # of midi notes that each incoming midi note will be transposed up or down by</li>
              <li>&quot;Transpose MIDI Notes&quot; is by default 0 (midi notes received will be unchanged)</li>
              <li>can be used to move an incoming midi note pattern to cover different areas of the uploaded images</li>
              <li>can be used in conjunction with &quot;Mod By&quot;. &quot;Mod By&quot; to narrow the window of images being triggered, &quot;Transpose MIDI Notes&quot; to move the window through the image array</li>
            </ul>
          </div>
          <div className='relative w-full h-[500px] overflow-hidden rounded-lg md:mt-6'>
            <Image src='/images/midi_image_seq_9.png' alt='midi_image_seq_9' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>

          {/* Reorder Images */}
          <h1 className='text-[#FFD700] text-3xl sm:text-4xl md:text-5xl mt-12'>Reorder Images</h1>
          <div className='w-[80%] lg:w-[50%] pl-2 xl:pl-6 mx-auto text-start text-lg md:text-xl text-opacity-60 font-bold text-white'>
            <ul className='list-disc pl-5 space-y-4'>
              <li className='mt-12'>&quot;Reorder Images&quot; provides the ability to rearrange the uploaded images&apos; positions&apos; in the images array</li>
              <li>for instance if you are sending midi note 48 to trigger image 48 but want a different image at index 48 to trigger, can rearrange the array on this page</li>
            </ul>
          </div>
          <div className='relative w-full h-[100px] overflow-hidden rounded-lg md:mt-6'>
            <Image src='/images/midi_image_seq_10.png' alt='midi_image_seq_10' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>

          <div className='w-[80%] lg:w-[50%] pl-2 xl:pl-6 mx-auto text-start text-lg md:text-xl text-opacity-60 font-bold text-white mt-12'>
            <ul className='list-disc pl-5 space-y-4'>
              <li>Select Randomize if you want to randomize the order of your images</li>
            </ul>
          </div>
          <div className='relative w-full h-[350px] overflow-hidden rounded-lg md:mt-6'>
            <Image src='/images/midi_image_seq_random.png' alt='midi_image_seq_10' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>

          <div className='w-[80%] lg:w-[50%] pl-2 xl:pl-6 mx-auto text-start text-lg md:text-xl text-opacity-60 font-bold text-white'>
            <ul className='list-disc pl-5 space-y-4'>
              <li className='mt-12'>click the image that you are wanting to move</li>
              <li>then click the image of where you would like to insert the 1st image that you clicked</li>
            </ul>
          </div>
          <div className='relative w-full h-[300px] overflow-hidden rounded-lg md:mt-6'>
            <Image src='/images/midi_image_seq_11.png' alt='midi_image_seq_11' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>
          <div className='relative w-full h-[300px] overflow-hidden rounded-lg md:mt-6'>
            <Image src='/images/midi_image_seq_12.png' alt='midi_image_seq_12' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>

          {/* Return to Home and start image sequence again */}
          <p className='mt-12'>return to Home Page</p>
          <p>and choose to Start image sequence again</p>
          <div className='relative w-full h-[200px] overflow-hidden rounded-lg md:mt-6'>
            <Image src='/images/midi_image_seq_13.png' alt='midi_image_seq_13' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>

          <div className='w-[80%] lg:w-[50%] xl:w-[40%] pl-2 xl:pl-6 mx-auto text-start text-lg md:text-xl text-opacity-60 font-bold text-white'>
            <ul className='list-disc pl-5'>
              <li className='mt-12'>click on Full Screen to have image player fill screen to display in sync with music during live performance</li>
            </ul>
          </div>
          <div className='relative w-full h-[200px] overflow-hidden rounded-lg md:mt-6'>
            <Image src='/images/midi_image_seq_14.png' alt='midi_image_seq_14' layout='fill' objectFit='contain' className='rounded-lg'/>
          </div>

        </div>

      </div>
            
      {/* github link */}
      <div data-aos='fade-left' data-aos-delay='100' className='w-[80%] mx-auto mt-[6vh] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold'>
        <div className='flex items-center justify-center mt-12'>
          <a 
            href='https://github.com/nathanfenoglio/midi-montage-image-sequencer' 
            target='_blank' 
            rel='noopener noreferrer' 
            data-aos='fade-right' 
            data-aos-delay='100' 
            style={{ animationDelay: '0.3s' }}
            className='bg-gradient-to-r from-[#FFD700] to-[#00FFFF] bg-clip-text text-transparent text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold hover:scale-105 transition-transform duration-300 animate-blink hover:animate-none'
          >
            Check out code on GitHub
          </a>
        </div>
      </div>

    </div>  

  )
}

export default Instructions
