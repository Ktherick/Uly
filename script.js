const songs = [
  {
    title:"Por você",
    artist:"Jão",
    cover:"capas/capa1.jpg",
    audio:"musicas/musica1.mp3",
    lyrics:`Se não for por você...`
  },
  {
    title:"Lisboa",
    artist:"Anavitoria",
    cover:"capas/capa2.jpg",
    audio:"musicas/musica2.mp3",
    lyrics:`Eu te queria a vida toda`
  },
  {
    title:"Serendipity",
    artist:"BTS",
    cover:"capas/capa3.jpg",
    audio:"musicas/musica3.mp3",
    lyrics:`Apenas me deixe te amar`
  },
  {
    title:"Dimple",
    artist:"BTS",
    cover:"capas/capa4.jpg",
    audio:"musicas/musica4.mp3",
    lyrics:`Sua beleza devia ser ilegal`
  },
  {
    title:"I wanna be yours",
    artist:"Arctic monkeys",
    cover:"capas/capa5.jpg",
    audio:"musicas/musica5.mp3",
    lyrics:`Eu só quero ser seu`
  },
  {
    title:"LOVESONG",
    artist:"TXT",
    cover:"capas/capa6.jpg",
    audio:"musicas/musica6.mp3",
    lyrics:`Me usa como uma droga`
  },
  {
    title:"Tudo me lembra",
    artist:"Jão",
    cover:"capas/capa7.jpg",
    audio:"musicas/musica7.mp3",
    lyrics:`Tudo me lembra você`
  }
];

const intro = document.querySelector(".intro");
const playerScreen = document.querySelector(".player-screen");
const finalScreen = document.querySelector(".final-screen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const title = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const lyrics = document.getElementById("lyrics");
const counter = document.getElementById("counter");

const playBtn = document.getElementById("playBtn");
const audio = document.getElementById("audio");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let currentSong = 0;

function formatTime(seconds){
  if(isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

function loadSong(){
window.scrollTo({
  top: 0,
  behavior: "smooth"
});
  const song = songs[currentSong];

  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  lyrics.textContent = song.lyrics;
  counter.textContent = `${currentSong + 1}/7`;

  audio.src = song.audio;
  progress.value = 0;
  currentTimeEl.textContent = "0:00";
  durationEl.textContent = "0:00";

const card=document.querySelector(".music-card");

card.style.opacity="0";
card.style.transform="translateY(25px)";

setTimeout(()=>{

card.style.opacity="1";
card.style.transform="translateY(0px)";

},200);

  audio.play();
  playBtn.innerHTML = "⏸";
}

function nextSong(){
  currentSong++;

  if(currentSong >= songs.length){
    playerScreen.classList.remove("active");
    finalScreen.classList.add("active");
    audio.pause();
    return;
  }

  loadSong();
}

startBtn.addEventListener("click", () => {
  intro.classList.remove("active");
  playerScreen.classList.add("active");
  loadSong();
});

playBtn.addEventListener("click", () => {
  if(audio.paused){
    audio.play();
    playBtn.innerHTML = "⏸";
  }else{
    audio.pause();
    playBtn.innerHTML = "▶";
  }
});

nextBtn.addEventListener("click", nextSong);

restartBtn.addEventListener("click", () => {
  currentSong = 0;
  finalScreen.classList.remove("active");
  intro.classList.add("active");
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if(audio.duration){
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

progress.addEventListener("input", () => {
  if(audio.duration){
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

audio.addEventListener("ended", () => {
  playBtn.innerHTML = "▶";
});
