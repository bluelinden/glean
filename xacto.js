var timeInSecs = 0
function updateTime() {
    return `It's been ${timeInSecs} ${timeInSecs != 1 ? 'seconds' : 'second'} since you pasted an image.`
}
setInterval(() => {
    timeInSecs++;
    document.getElementById('time').innerHTML = updateTime();
}, 1000);
addEventListener('paste', (event) => {
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
 });

