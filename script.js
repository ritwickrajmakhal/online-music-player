const music = document.querySelector("audio");

const img = document.querySelector("img");

const artist = document.getElementById("artist");

const title = document.getElementById("title");

const next = document.getElementById("next");

const previous = document.getElementById("previous");

const play = document.getElementById("play");
const btn2 = document.querySelector(".fa-random");
const btn = document.querySelector(".fa-repeat");
const sleepBtn = document.querySelector("#sleepbtn");
let isPlaying = false;

const playMusic = () => {
  music.play();

  isPlaying = true;

  play.classList.replace("fa-play", "fa-pause");

  img.classList.add("anime");
};

const pauseMusic = () => {
  music.pause();

  isPlaying = false;

  play.classList.replace("fa-pause", "fa-play");

  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

const loadSong = (song) => {
  title.textContent = song.title;

  artist.textContent = song.artist;

  music.src = song.name;

  img.src = song.image;
};

let songIndex = 0;
//shuffleSong
const shuffleSong = () => {
  const randomNo = Math.floor(Math.random() * songs.length);
  songIndex = randomNo;
  loadSong(songs[songIndex]);
  playMusic();
};
//loadSong(songs[1]);

const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;

  loadSong(songs[songIndex]);

  playMusic();
};

const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;

  loadSong(songs[songIndex]);

  playMusic();
};

/////////////////////////////////////////////////////////////

btn.addEventListener("click", function () {
  btn2.style.color = "grey";
  btn.style.color = "cyan";
  previous.removeAttribute("onclick", "shuffleSong()");
  next.removeAttribute("onclick", "shuffleSong()");
  previous.setAttribute("onclick", "prevSong()");
  next.setAttribute("onclick", "nextSong()");
  if (btn.classList.contains("fa-repeat")) {
    btn.classList.add("fa-repeat-1");

    btn.classList.remove("fa-repeat");

    //loop song

    music.setAttribute("loop", "");

    music.removeAttribute("onended");
  } else {
    btn.classList.add("fa-repeat");

    btn.classList.remove("fa-repeat-1");

    music.removeAttribute("loop");

    music.setAttribute("onended", "nextSong()");
  }
});
/////////////////////////////////////////////////////////////

btn2.addEventListener("click", function () {
  btn.style.color = "grey";

  if (btn2.style.color == "cyan") {
    btn2.style.color = "grey";
    //play next song
    btn.style.color = "cyan";
    previous.removeAttribute("onclick", "shuflleSong()");
    next.removeAttribute("onclick", "shuffleSong()");
    music.removeAttribute("onended", "shuffleSong()");
    music.setAttribute("onended", "nextSong()");
    previous.setAttribute("onclick", "prevSong()");
    next.setAttribute("onclick", "nextSong()");
  } else {
    btn2.style.color = "cyan";
    //play random songs
    music.removeAttribute("onended", "nextSong()");
    music.setAttribute("onended", "shuffleSong()");
    previous.removeAttribute("onclick", "prevSong()");
    previous.setAttribute("onclick", "shuffleSong()");
    next.removeAttribute("onclick", "nextSong");
    next.setAttribute("onclick", "shuffleSong()");
  }
});
/////////////////////////////
// sleep area
let startSleep;
let usersTime;
function gotoSleep() {
  usersTime = parseInt(sleepBtn[sleepBtn.selectedIndex].value);
  clearInterval(startSleep);
  if (usersTime != 0) {
    alert("Stop audio in " + usersTime + "min");
    startSleep = setInterval(sleep, usersTime * 60 * 1000);
  }
  else {
    alert("Sleep timer off");
  }
}
function sleep() {
  music.play();
  clearInterval(startSleep);
  music.pause();
  sleepBtn.selectedIndex = 0;
}

const searchBox = document.getElementById("searchBox");
const playerView = document.getElementById("playerView");
searchBox.addEventListener("keyup", async (event) => {
  if (event.key === 'Enter') {
    const url = 'https://spotify23.p.rapidapi.com/search/?q=tumhe%20kitna&type=multi&offset=0&limit=10&numberOfTopResults=5';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ef40c740f7mshb4de3995ef42ed5p13273fjsn720d07741f29',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    
  }
});
