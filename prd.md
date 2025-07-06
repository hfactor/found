## To Do

1. **Masonry Grid Refactor**
   - [x] Flatten all images from all folders/years into a single list.
   - [x] Randomize the order of all images globally (not grouped by year).
   - [x] Render images in a true masonry (Pinterest-style) layout with variable heights and responsive columns. Maintain the width.

2. **Image Meta Overlay**
   - [ ] On hover (desktop) or tap (mobile), show an overlay on each image with:
     - [x] File name (without `.jpg`) as the title.
     - [x] Year (folder name) as a subtitle.
   - [x] Overlay should be centered, with a subtle highlight, and use smooth CSS transitions.

3. **Lightbox/Modal**
   - [ ] Retain the current lightbox/modal functionality, including next/prev navigation and ESC/close support.
   - [ ] Show the same meta (title, year) as an overlay in the modal.

4. **Image Fade-in Animation**
   - [ ] Add a fade-in effect for images as they load, for a smoother user experience.

5. **Header Section**
   - [ ] Header section to have three buttons 
      - [ ]"The Found" on left
      - [ ] Button "About" and "Hiran.in" on right
      - [ ] "About" displays the description from the page frontmatter (as in `index.md`). 
         - [ ] Make sure this is mobile first, and has a close button
      - [ ] "Hiran.in" is a Hyperlink

6. **Styling and Responsiveness**
   - [ ] Ensure the layout and all interactions are responsive for all devices.
   - [ ] Use playful, minimal animations (lift/scale/fade) for grid items and overlays.

7. **Code Organization**
   - [ ] Continue using the current setup with inline CSS/JS in the main template (`layout.njk`).
   - [ ] No need to move styles/scripts to external asset folders at this stage.

8. Bugs
   - [ ] Masonry is breaking while hovering the first item 
   - [ ] The zoom-in and border on hover looks old school
   - [ ] Loading takes too much time; that old code. 
