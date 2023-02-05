var isDocsPaste = false;
var timeInSecs = 0
function updateTime() {
    if(timeInSecs != 1) {return "It's been " + timeInSecs + " seconds since you last pasted an image."} else {return "It's been " + timeInSecs + " second since you last pasted an image."}
}
setInterval(() => {
    timeInSecs++;
    document.getElementById('time').innerHTML = updateTime();
}, 1000);
addEventListener('paste', (event) => {

    isDocsPaste = false;
    event.preventDefault();
    var paste = (event.clipboardData || window.clipboardData)
    var image = paste.getData('text/html');
    var isDocsPaste = (paste.getData('application/x-vnd.google-docs-image-clip+wrapped')) ? true : false;
    if(!isDocsPaste) {
        window.alert('This is not a Google Docs image. Please paste a Google Docs image.');
    } else {
    timeInSecs = 0;
    document.getElementById('time').innerHTML = updateTime();
    }
    const parser = new DOMParser();
    var imageHTML = parser.parseFromString(image, 'text/html');
    var img = imageHTML.getElementsByTagName('img')[0];
    document.getElementById('download').download = new Date().toISOString;
    document.getElementById('download').href = img.src;
    document.getElementById('download').target = '_blank';
    document.getElementById('download').classList.remove('hidden');
    document.getElementById('time').classList.remove('hidden');
    if(!isDocsPaste) {
        window.alert('This is not a Google Docs image. Please paste a Google Docs image.');
    }

 });

