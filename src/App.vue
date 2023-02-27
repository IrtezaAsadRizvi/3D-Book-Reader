<template>
  <div class="book-container">
    <div class="book">
      <div id="pages" class="pages">
        <div class="page"><p>Open Me, <br>please!</p></div>
        <div class="page"></div>
        <div class="page"><p>Hello there!</p></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
        <div class="page"></div>
      </div>
    </div>
  </div>
</template>


<script setup>
import {  onMounted } from 'vue'
onMounted(() => {
  var pages = document.getElementsByClassName('page');
for(var i = 0; i < pages.length; i++)
{
  var page = pages[i];
  if (i % 2 === 0)
    {
      page.style.zIndex = (pages.length - i);
    }
}

document.addEventListener('DOMContentLoaded', function(){
  for(var i = 0; i < pages.length; i++)
    {
      //Or var page = pages[i];
      pages[i].pageNum = i + 1;
      pages[i].onclick=function()
        {
          if (this.pageNum % 2 === 0)
            {
              this.classList.remove('flipped');
              this.previousElementSibling.classList.remove('flipped');
            }
          else
            {
              this.classList.add('flipped');
              this.nextElementSibling.classList.add('flipped');
            }
          }
      }
})

async function pdfToImages(pdfFile) {
  // Load the PDF file using pdf.js
  const pdf = await pdfjsLib.getDocument(pdfFile).promise;

  // Initialize an array to hold the resulting images
  const images = [];

  // Loop through each page of the PDF
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    // Get the page object for the current page
    const page = await pdf.getPage(pageNum);

    // Set the desired image resolution (in DPI)
    const scale = 2;

    // Get the viewport object for the current page
    const viewport = page.getViewport({ scale });

    // Create a canvas element to draw the page onto
    const canvas = document.createElement("canvas");

    // Set the dimensions of the canvas to match the viewport
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Get the canvas context
    const context = canvas.getContext("2d");

    // Render the page onto the canvas
    await page.render({ canvasContext: context, viewport }).promise;

    // Convert the canvas to an image data URL
    const imageDataUrl = canvas.toDataURL();

    // Create a new Image object and set its src to the data URL
    const image = new Image();
    image.src = imageDataUrl;

    // Push the image onto the array of images
    images.push(image);
  }

  // Return the array of images
  return images;
}

})

</script>