// Get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");

const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

//build functions
function togglePlay() {
    //select play button, onclick, play video, when you click again stop video
    if (video.paused) {
        video.play()
    }
    else {
        video.pause()
    }
}

function HandleprogressBar() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function skip() {
    //using the this event, grab the attribute value of the clicked button
    //then using the time property of the video, add or subtract the data attribute
    let timeskip = Number.parseFloat(this.dataset.skip);
    video.currentTime +=timeskip
}
function updateButton() { //change icon based on attributes
    const icon = this.paused ? "►" : "❚ ❚";
    toggle.textContent = icon
}
function handleRangeUpdate() {
    video[this.name] = this.value;
}
video.addEventListener("pause", updateButton); //activates based on attribute
video.addEventListener("play", updateButton); //activates based on attribute
//hook up event listeners for play button
toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

//skip button
skipButtons.forEach(button => button.addEventListener("click", skip)); //adds click listener to the buttons
//sliders
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

video.addEventListener("timeupdate", HandleprogressBar);

progress.addEventListener("click", scrub);

let mousedown = false;
progress.addEventListener("mousemove", (e)=> mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);