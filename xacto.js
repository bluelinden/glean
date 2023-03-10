/* eslint-disable max-len */

// Description: A script that allows you to paste Google Docs images into your browser and download them.

let timeInSecs = 0;
/**
 * @return {string} A sentence that tells the user how long it's been since they pasted an image.
 * @description This function constructs a sentence that tells the user how long it's been since they pasted an image. It uses the timeInSecs variable to determine how long it's been since the last image was pasted.
 */
function updateTime() {
  return `It's been ${timeInSecs} ${timeInSecs != 1 ? 'seconds' : 'second'} since you pasted an image.`;
  // If timeInSecs is not equal to 1, then it will return 'seconds', otherwise it will return 'second'. This constructs a sentence that is used to display the time since the last image was pasted.
}

setInterval(() => { // every second, add a second to the time
  timeInSecs++;
  document.getElementById('time').innerHTML = updateTime();
  // use our updateTime function to give us a sentence that we can display, and then display it in the HTML
}, 1000);
addEventListener('paste', (event) => {
  event.preventDefault(); // prevent the default paste action of pasting the image into the page
  const paste = (event.clipboardData || window.clipboardData); // get the clipboard data from the event
  const image = paste.getData('text/html'); // get the image and other html from the clipboard data
  const isDocsPaste = ((paste.getData('application/x-vnd.google-docs-image-clip+wrapped')) && paste.getData('text/html')) ? true : false; // check if the image is a Google Docs image by checking if the application/x-vnd.google-docs-image-clip+wrapped mime type is present. if it is, then it's a Google Docs image. if it's not, then it's not a Google Docs image.
  if (!isDocsPaste ) { // if it's not a Google Docs image, then alert the user and return
    window.alert('This is not a Google Docs or Slides image. Please paste a Google Docs or Slides image.');
    return; // return so that the rest of the code doesn't run
  } else {
    timeInSecs = 0; // if it is a Google Docs image, then reset the time to 0 because we just pasted an image
    document.getElementById('time').innerHTML = updateTime(); // update the time in the HTML instantly instead of waiting for the next second to pass
  }

  const parser = new DOMParser(); // create a new DOMParser that we can use to parse the HTML
  const imageHTML = parser.parseFromString(image, 'text/html'); // parse the HTML
  const img = imageHTML.getElementsByTagName('img')[0]; // get the first image tag from the HTML, because that's the image we want
  document.getElementById('download').href = img.src; // set the href of the download link to the src of the image
  document.getElementById('download').target = '_blank'; // set the target of the download link to _blank so that it opens in a new tab
  document.getElementById('download').classList.remove('hidden'); // remove the hidden class from the download link so that it's visible
  document.getElementById('time').classList.remove('hidden'); // remove the hidden class from the time so that it's visible
});

