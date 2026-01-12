const video = document.querySelector('.player'); 
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() { 
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }) // Asks for permission to use device camera, this is a async process as you need to wait for user to allow it
        .then((localMediaStream) => {
            video.srcObject = localMediaStream; // sets the video source to the local media stream obtained from the camera
            video.play(); // displays the video stream in the video element
        })
        .catch(err => { 
            alert(`OH NO!!! ${err}`); 
        })
}

function paintToCanvas() {  //allows interaction between video and canvas
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    return setInterval(() => {  // runs every 16 milliseconds (~60fps)
        ctx.drawImage(video, 0, 0, width, height); // draws the current frame from the video onto the canvas
        const pixels = ctx.getImageData(0, 0, width, height); // gets the pixel data from the canvas
        let redPixels = redEffect(pixels); // applies the red effect to the pixel data
        ctx.putImageData(redPixels, 0, 0); // puts the modified pixel data back onto the canvas
    }, 16)
} 
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100;
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
    }
    return pixels;

}

function takePhoto() { 
    snap.currentTime = 0; // rewind to the start
    snap.play();
    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg'); // gets the image data from the canvas as a data URL
    const link = document.createElement('a'); // creates a new anchor element
    link.href = data; // sets the href to the image data
    link.setAttribute('download', 'handsome'); // sets the download attribute to the link allowing it to be downloadable suggest a filename
    link.innerHTML = `<img src="${data}" alt="cool beans" />`; // sets the inner HTML to an image element with the data URL as the source
    strip.insertBefore(link, strip.firstChild); // adds the link to the top of the strip
}



getVideo();

video.addEventListener('canplay', paintToCanvas); // when the video is ready to play, start painting to canvas