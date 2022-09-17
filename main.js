let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Kesariya",
    artist: "Arjit Singh",
    image: "D:\music pratice\20220906_125857_0000.png",
    path: "https://pagalworld.com.se/files/download/id/6594"
  },
  {
    name: "Lag ja gale",
    artist: "Rahat Fateh Ali Khan , SachinJigar",
    image: "D:\music pratice\20220906_125857_0000.png",
    path: "https://pwdown.com/8879/Lag%20Ja%20Gale%20-%20Rahat%20Fateh%20Ali%20Khan%20190Kbps.mp3"
  },
  {
    name: "Riste Naate",
    artist: "Rahat Fateh Ali Khan , SachinJigar",
    image: "D:\music pratice\20220906_125857_0000.png",
    path: "https://pwdown.com/8879/Rishte%20Naate%20-%20Rahat%20Fateh%20Ali%20Khan%20320Kbps.mp3",
  },
  {
    name: "Ham ko Pyar Hua",
    artist: "K.K",
    image: "D:\music pratice\20220906_125857_0000.png",
    path: "https://pwdown.com/11981/Humko%20Pyaar%20Hua%20(Ready)%20-%20K.K%20-%20320Kbps.mp3",
  },  
  {
    name: "Mila ahu Ab Jo Tum Se",
    artist: "Arjit Singh",
    image: "D:\music pratice\20220906_125857_0000.png",
    path: "https://oyedjsurendra.com/files/download/id/3695&volume=75&showstop=1&showvolume=1",
  },  
  {
    name: "Main Hoon Saath Tere",
    artist: "Arjit Singh",
    image: "D:\music pratice\20220906_125857_0000.png",
    path: "https://ghantalele.com/player/30347",
  },  
  {
    name: "Channa ve ",
    artist: "Akhil Sachdeva",
    image: "D:\music pratice\20220906_125857_0000.png",
    path: "https://mastimusic.com/files/download/id/999",
  },  
  {
    name: " rang lageya",
    artist: "mohit chauhan",
    image: "D:\music pratice\20220906_125857_0000.png",
    path: "https://pwdown.com/113514/Rang%20Lageya%20-%20Mohit%20Chauhan.mp3",
  },  
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}


function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value / 100);
 
  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}
 
function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}
function seekUpdate() {
  let seekPosition = 0;
 
  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
 
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
 
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
 
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
// Load the first track in the tracklist
loadTrack(track_index);
