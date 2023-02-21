import { CanvasControl } from "./canvasControl.js";
import { PlayListControl } from "./playListControl.js";
export class AudioControl {
  constructor(playList, ctx, playListControl) {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.audio = document.getElementById("audio");
    this.analyser = this.audioContext.createAnalyser();
    this.source = this.audioContext.createMediaElementSource(this.audio);  
  
    this.playListControl = playListControl;

    this.ctx = ctx;

    this.barsStroke = [];
    this.barsRect = [];
    this.animation;

    this.index = 0;
    this.plyaListLength = playList.length;
    this.currentTime = 0;
    this.playList = playList.sort((a,b) => {
      return a.id > b.id ? 1 : -1;
    });
    this.currentSong = document.getElementsByClassName("currnetSong")[0];
    this.currentName = "";

    this.informBtn = document.getElementById("informBtn");
    this.informBtn.addEventListener("click", (e) => this.initAudioContext(e));

    this.startBtn = document.getElementById("start");
    this.startBtn.addEventListener("click", (e) => this.initAudioContext(e));

    this.pauseBtn = document.getElementById('pause');
    this.pauseBtn.addEventListener("click", (e) => this.stopMusic(e));

    this.previousBtn = document.getElementById("previous");
    this.previousBtn.addEventListener("click", (e) => this.previousMusic(e));

    this.nextBtn = document.getElementById("next");
    this.nextBtn.addEventListener("click", (e) => this.nextMusic(e));

    this.canvas = document.querySelector("canvas");

    this.modal = document.getElementsByClassName("modal")[0];
    this.modalCloseBtn = document.getElementsByClassName("close")[0];
    this.modalCloseBtn.addEventListener("click", ()=>{
        this.modal.id = 'hide';
    })

    this.audio.addEventListener("ended", (e) => {
      if (this.index < this.plyaListLength - 1) {
        this.index += 1;
        this.audio.src = this.getPlayList()[this.index].src;
        this.currentSong.innerHTML = this.getPlayList()[this.index].name;
        this.playListControl.playingMusic(this.getPlayList()[this.index].key);
        this.audio.play();
       
      } else {
        this.index = 0;
        this.audio.src = this.getPlayList()[index].src;
        this.currentSong.innerHTML = this.getPlayList()[this.index].name;
        this.playListControl.playingMusic(this.getPlayList()[this.index].key);
        this.audio.play();
      }
    });

    
  }

  setPlayList(playList){
    this.playList = playList;
    this.plyaListLength = this.playList.length;

  }

  getPlayList() {
    return this.playList;
  }

  initAudioContext(e) {
   
    // this.audio = document.getElementById("audio");
    this.audioContext.resume().then(()=>{
      this.source.connect(this.analyser);
      this.source.connect(this.audioContext.destination);
      this.analyser.fftSize = 512;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);
      this.startMusic();
    })
  }

  stopMusic(){
      this.audio.pause();
      this.currentTime = this.audio.currentTime;
      this.startBtn.style.display = "block";
      this.pauseBtn.style.display = "none";
      cancelAnimationFrame(this.animation);
      setTimeout(() => {
        document.getElementsByClassName("inform")[0].style.visibility =
          "visible";
        document.getElementsByClassName("inform")[0].style.opacity = 1;
      }, 1800);
      this.getDataArray();
      this.source.disconnect();
  }

  startMusic(){
    console.log(this.getPlayList());
    if (this.audio.paused) {
      if (this.getPlayList().length === 0) {
        this.modal.id = 'show';
      } else {
        this.audio.src = this.getPlayList()[this.index].src;
        // this.audio.id = this.getPlayList()[this.index].id;
        console.log(this.getPlayList()[this.index].name)
        this.currentSong.innerHTML = this.getPlayList()[this.index].name;

        this.audio.currentTime = this.currentTime;
        
        this.startBtn.style.display = "none";
        this.pauseBtn.style.display = "block";
        this.audio.play();
        this.getDataArray();
        document.getElementsByClassName("inform")[0].style.visibility =
          "hidden";
        document.getElementsByClassName("inform")[0].style.opacity = 0;
        this.playListControl.playingMusic(this.getPlayList()[this.index].key);
      }
    }
  }

  getDataArray() {
    this.analyser.getByteFrequencyData(this.dataArray);
    for (let i = 0; i < this.bufferLength; i++) {
      this.canvasControl.update(this.bufferLength, this.dataArray);
    }
    this.animation = requestAnimationFrame(this.getDataArray.bind(this));
  }

  previousMusic(e) {
    console.log(this.getPlayList());
    if(!this.audio.paused){
      if (this.index > 0) {
        this.index -= 1;
      } else {
        this.index = 0;
      }
      this.audio.src = this.getPlayList()[this.index].src;
      this.audio.src = this.getPlayList()[this.index].src;
      this.currentSong.innerHTML = this.getPlayList()[this.index].name;
      this.startBtn.style.display = "none";
      this.pauseBtn.style.display = "block";
      this.audio.play();
  
      this.playListControl.playingMusic(this.getPlayList()[this.index].key);
    }
  }

  nextMusic(e) {
    if(!this.audio.paused){
    if (this.index < this.plyaListLength - 1) {
      this.index += 1;
    } else {
      this.index = 0;
    }
    this.audio.src = this.getPlayList()[this.index].src;
    this.currentSong.innerHTML = this.getPlayList()[this.index].name;
    this.startBtn.style.display = "none";
    this.pauseBtn.style.display = "block";
    this.audio.play();
    
    this.playListControl.playingMusic(this.getPlayList()[this.index].key);
  }
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.canvasControl = new CanvasControl(this.ctx);
  }
}
