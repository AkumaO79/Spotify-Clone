let songIndex = 0;
let playingimage = document.getElementById("gif");
let audioElement = new Audio("utils/songs/song1.mp3");
let MasterPlay = document.getElementById("play");
let myProgressBar = document.getElementById("progresser");
let songSection = Array.from(document.getElementsByClassName("song"));
let songPlayButton = Array.from(document.getElementsByClassName("playbanner"));
let currentPic = document.getElementById("songpic");
let currentSong = document.getElementById("songinfo");
let currentArtist = document.getElementById("artistinfo");
let Prev = document.getElementById("previousbutt");
let Nex = document.getElementById("nextbutt");



let songs = [
    { songName: "Kick Back", filePath: "utils/songs/song1.mp3", coverPath: "utils/covers/cover1.png", uploadDate: "Jan 3, 2023", durationHere: "3:13", authorName: "Kenshi Yonezu", albumName: "KICK BACK" },
    { songName: "WINNER", filePath: "utils/songs/song2.mp3", coverPath: "utils/covers/cover2.png", uploadDate: "Jan 12, 2022", durationHere: "3:32", authorName: "Blue Lock", albumName: "WINNER" },
    { songName: "コバルト", filePath: "utils/songs/song3.mp3", coverPath: "utils/covers/cover3.png", uploadDate: "Sept 7, 2021", durationHere: "4:00", authorName: "Mob Choir", albumName: "1" },
    { songName: "The Search", filePath: "utils/songs/song4.mp3", coverPath: "utils/covers/cover4.png", uploadDate: "Oct 23, 2021", durationHere: "4:08", authorName: "NF", albumName: "Andless" },
    { songName: "Aao Chalein", filePath: "utils/songs/song5.mp3", coverPath: "utils/covers/cover5.png", uploadDate: "Dec 8, 2021", durationHere: "3:05", authorName: "Taba Chake", albumName: "BOMBAY DREAMS" },
    { songName: "Lost in Paradise", filePath: "utils/songs/song6.mp3", coverPath: "utils/covers/cover6.png", uploadDate: "Feb 14, 2022", durationHere: "5:28", authorName: "ALI, AKLO", albumName: "NF Collection" },
    { songName: "One Way", filePath: "utils/songs/song7.mp3", coverPath: "utils/covers/cover7.png", uploadDate: "Apr 8, 2016", durationHere: "3:11", authorName: "Daichi Yamamoto", albumName: "JJK - Lost in Paradise" }
]

// songlist dynamic:
songSection.forEach((element, i) => {
    element.getElementsByClassName("songcover")[0].src = songs[i].coverPath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songName;
    element.getElementsByClassName('album')[0].innerText = songs[i].albumName;
    element.getElementsByClassName('authorname')[0].innerText = songs[i].authorName;
    element.getElementsByClassName('duration')[0].innerText = songs[i].durationHere;
    element.getElementsByClassName('date')[0].innerText = songs[i].uploadDate;
})

// makes all other buttons into play:
const makeAllPlays = () => {
    songPlayButton.forEach((element) => {
        element.src = "Utils/play.png";
    })
}

songPlayButton.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (playingimage.style.opacity == "1" && songIndex == element.id) {
            audioElement.pause();
            playingimage.style.opacity = "0";
            // MasterPlay.setAttribute("src", "Utils/play.png");
            MasterPlay.src = "Utils/play.png";
            makeAllPlays();
        }
        else {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.src = "Utils/pause.png";
            audioElement.src = `Utils/songs/song${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            playingimage.style.opacity = "1";
            MasterPlay.src = "Utils/pause.png";
            currentPic.src = `Utils/covers/cover${songIndex}.png`;
            currentSong.innerText = songs[songIndex - 1].songName;
            currentArtist.innerText = songs[songIndex - 1].authorName;
        }
    })
})

// Previous/Next song:
Prev.addEventListener('click', () => {
    if (songIndex < 2) {
        songIndex = 7;
    }
    else {
        songIndex -= 1;
    }
    makeAllPlays();
    songPlayButton[songIndex - 1].src = "Utils/pause.png";
    playingimage.style.opacity = "1";
    audioElement.src = `Utils/songs/song${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    MasterPlay.src = "Utils/pause.png";
    currentPic.src = `Utils/covers/cover${songIndex}.png`;
    currentSong.innerText = songs[songIndex - 1].songName;
    currentArtist.innerText = songs[songIndex - 1].authorName;
})

Nex.addEventListener('click', () => {
    if (songIndex > 6) {
        songIndex = 1;
    }
    else {
        songIndex += 1;
    }
    makeAllPlays();
    songPlayButton[songIndex - 1].src = "Utils/pause.png";
    playingimage.style.opacity = "1";
    audioElement.src = `Utils/songs/song${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    MasterPlay.src = "Utils/pause.png";
    currentPic.src = `Utils/covers/cover${songIndex}.png`;
    currentSong.innerText = songs[songIndex - 1].songName;
    currentArtist.innerText = songs[songIndex - 1].authorName;
})



// play/apuse:
MasterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        songPlayButton[songIndex - 1].src = "Utils/pause.png";
        playingimage.style.opacity = "1";
        // MasterPlay.setAttribute("src", "Utils/pause.png");
        MasterPlay.src = "Utils/pause.png";
        // MasterPlay.src.add("Utils/pause.png");
    }

    else {
        audioElement.pause();
        playingimage.style.opacity = "0";
        // MasterPlay.setAttribute("src", "Utils/play.png");
        MasterPlay.src = "Utils/play.png";
        makeAllPlays();
    }
})


// listen to events (timechange)
audioElement.addEventListener('timeupdate', () => {
    // Working seekbar:
    progressval = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progressval;

    if (progressval >= 100) {
        console.log(songIndex);
        songIndex += 1;
        console.log(songIndex);
        audioElement.src = `Utils/songs/song${songIndex + 1}.mp3`;
        makeAllPlays();
        songPlayButton[songIndex - 1].src = "Utils/pause.png";
        playingimage.style.opacity = "1";
        audioElement.src = `Utils/songs/song${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        MasterPlay.src = "Utils/pause.png";
        currentPic.src = `Utils/covers/cover${songIndex}.png`;
        currentSong.innerText = songs[songIndex - 1].songName;
        currentArtist.innerText = songs[songIndex - 1].authorName;
        // audioElement.pause();
        // playingimage.style.opacity = "0";
        // MasterPlay.src = "Utils/play.png";
        // // MasterPlay.setAttribute("src", "Utils/play.png");
    }

})

// Update song with seekbar:
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration) / 100);
})






// let change = document.querySelector("buttonchange");

// // (change) => {
// //     change.addEventListener('click', change.src = "/Utils/previous.png")
// // }
// // function changeImage() {
// //     if (change.src == "/utils/next.png") {
// //         change.src = "/utils/previous.png";
// //     } else {
// //         change.src = "/utils/next.png";
// //     }
// // }

// change.addEventListener("click", (e) => {
//     if ((change.innerHTML.src == "/utils/next.png")) {
//         change.innerHTML.src = "/utils/previous.png";
//     } else {
//         change.innerHTML.src == "/utils/next.png"
//     }
//   });
