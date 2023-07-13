// Initialize the vars
let songIndex=1;
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let audioElement=new Audio("song/1.mp3");
let songItems=Array.from(document.getElementsByClassName("songItem"));
// This is the document which carries display for song name
let masterSong=document.getElementById("masterSongName");

let songs=[
    {songName:"No Need",filePath:"song/1.mp3",coverPath:"Song Cover/1.jpg", singerName:"Karan Aujla"},
    {songName:"Levels",filePath:"song/2.mp3",coverPath:"Song Cover/2.jpg", singerName:"Sidhu Moosewala"},
    {songName:"52 Bars",filePath:"song/3.mp3",coverPath:"Song Cover/3.jpg", singerName:"Karan Aujla"},
    {songName:"Vanilla",filePath:"song/4.mp3",coverPath:"Song Cover/4.jpg", singerName:"Diljit Dosanjh"},
    {songName:"Mood Swings",filePath:"song/5.mp3",coverPath:"Song Cover/5.jpg", singerName:"Tegi Pannu"},
    {songName:"Mera Na",filePath:"song/6.mp3",coverPath:"Song Cover/6.jpg", singerName:"Sidhu Moosewala"},
    {songName:"Faraar",filePath:"song/7.mp3",coverPath:"Song Cover/7.jpg", singerName:"Jassa Dhillon"}
];

songItems.forEach((element,i)=>{
    element.querySelector("img").src=songs[i].coverPath;
    element.querySelector(".songName").innerText=songs[i].songName;
})


// handle pause/play
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity="1"
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity="0"
    }
})
// Listen To Events
audioElement.addEventListener("timeupdate",()=>{
    let progress=parseFloat((audioElement.currentTime/audioElement.duration) *100);
    myProgressBar.value=progress;
    if(audioElement.currentTime==audioElement.duration){
        if(songIndex==7){
            songIndex=1;
            audioElement.src=`song/${songIndex}.mp3`;
            audioElement.currentTime=0;
            audioElement.play();
        }
        else{
            songIndex+=1;
            audioElement.src=`song/${songIndex}.mp3`;
            audioElement.currentTime=0;
            audioElement.play();
        }
        masterSong.innerText=songs[songIndex-1]["songName"];
        gif.style.opacity="1"
    }
});
// To shift song duration using progress bar
myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play")
    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        if(e.target.classList.contains("fa-circle-play")){
            songIndex=parseInt(e.target.id);
            makeAllPlays();
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.src=`song/${songIndex}.mp3`;
            audioElement.currentTime=0;
            audioElement.play();
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            gif.style.opacity="1";
            masterSong.innerText=`${songs[songIndex-1]["songName"]}`+ ` - ${songs[songIndex-1]["singerName"]}`;
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
            gif.style.opacity="0";
            e.target.classList.add("fa-circle-play");
            e.target.classList.remove("fa-circle-pause");
        }
    })
})
// next button control
document.getElementById("next").addEventListener("click",()=>{
    if(songIndex==7){
        songIndex=1;
        audioElement.src=`song/${songIndex}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
    }
    else{
        songIndex+=1;
        audioElement.src=`song/${songIndex}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
    }
    makeAllPlays();
    document.getElementById(songIndex).classList.remove("fa-circle-play");
    document.getElementById(songIndex).classList.add("fa-circle-pause");
    masterSong.innerText=`${songs[songIndex-1]["songName"]}`+ ` - ${songs[songIndex-1]["singerName"]}`;
    gif.style.opacity="1"
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})
// besides next button, whenver song gets over it should play next song, that is already added in updatetime event.

// previous button control
document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex==1){
        songIndex=7;
        audioElement.src=`song/${songIndex}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
    }
    else{
        songIndex-=1;
        audioElement.src=`song/${songIndex}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
    }
    makeAllPlays();
    document.getElementById(songIndex).classList.remove("fa-circle-play");
    document.getElementById(songIndex).classList.add("fa-circle-pause");
    masterSong.innerText=`${songs[songIndex-1]["songName"]}`+ ` - ${songs[songIndex-1]["singerName"]}`;
    gif.style.opacity="1"
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})