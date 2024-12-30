# Midi Montage Image Sequencer
Please use with your midi device at: </br>
https://midi-montage-image-sequencer.vercel.app/
</br>
- created with Next.js and Tailwind CSS using Web MIDI API to receive MIDI messages 

# instantly sync midi notes with mapped images in real time for live performance or visual montage compositions 

# Instructions
### go to https://midi-montage-image-sequencer.vercel.app/
### select midi input port from drop down menu
### (need ports set up on computer, I use LoopBe30 for windows os)
### https://www.nerds.de/en/loopbe30.html
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/1.png)
### select image files to sequence from your device
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/2.png)
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/3.png)
### set up midi send from daw or through internal routing in computer
### send midi to midi input port selected from drop down
### can use prewritten midi notes or played real time with whatever midi controller device that you have configured
### 
### example sending midi from Ableton Live
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/4.png)
### example sending midi from Supercollider
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/5.png)
### click Start button to display images triggered by incoming midi notes
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/6.png)
### images will display in real time with midi notes received by app
###
### click on Full Screen to have image player fill screen to display in sync with music during live performance
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/7.png)

<!-- ## Mod By / Mod By # Images -->
<h2 style="color: purple;">Mod By / Mod By # Images</h2>
### "Mod By" specifies what the incoming midi note will be modded by
### for example incoming midi note of 67 with "Mod By" set at 64 will trigger image 3 in images array 67 % 64 = 3
### "Mod By" is by default set to the # of images that the user uploaded
### to specify custom "Mod By" value, uncheck "Mod By # Images" checkbox
### and input new value for "Mod By"
### this value can be used to experiment with to produce patterns with varying range constrained by the "Mod By" value
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/8.png)

## Transpose MIDI Notes
### parameter for user to specify the # of midi notes that each incoming midi note will be transposed up or down by
### "Transpose MIDI Notes" is by default 0 (midi notes received will be unchanged)
### can be used to move an incoming midi note pattern to cover different areas of the uploaded images
### can be used in conjunction with "Mod By". "Mod By" to narrow the window of images being triggered,  "Transpose MIDI Notes" to move the window through the image array
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/9.png)

## Reorder Images
### "Reorder Images" provides the ability to rearrange the uploaded images' positions' in the images array
### for instance if you are sending midi note 48 to trigger image 48 but want a different image at index 48 to trigger, can rearrange the array on this page
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/10.png)
### click the image that you are wanting to move
### then click the image of where you would like to insert the 1st image that you clicked
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/11.png)
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/12.png)
### return to Home Page 
### and choose to Start image sequence again
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/13.png)
### click on Full Screen to have image player fill screen to display in sync with music during live performance
![alt_image](https://github.com/nathanfenoglio/midi-montage-image-sequencer/blob/main/readme_images/14.png)

# https://midi-montage-image-sequencer.vercel.app/

