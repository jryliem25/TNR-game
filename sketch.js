function abss(x) {
  if (x < 0) {
    return -1 * x;
  }
  return x;
}

////////////////////////////////////////////////////////////

let catpaw;

////////////////////////////////////////////////////////////

let images = [];
let sprites = [];
let cooltime = 0;

////////////////////////////////////////////////////////////

const NUM_OF_AVAILABLE_CATS = 36;
const NUM_OF_CATS = 14;

////////////////////////////////////////////////////////////

let vid;
let playbutton;
let videoWidth;
let videoHeight;
let STATUS = "VIDEO_NOT_YET_PLAY";

////////////////////////////////////////////////////////////

let areaLst = [
  [20, 300, 125, 125],
  [560, 880, 125, 125],
  [1220, 1500, 125, 125],

  [300, 550, 250, 250],
  [1045, 1320, 250, 250],
  [1490, 1740, 300, 300],

  [10, 70, 425, 425],
  [200, 500, 385, 385],
  [630, 920, 410, 410],

  [1130, 1430, 415, 415],
  [400, 730, 565, 565],
  [1020, 1315, 545, 545],

  [1600, 1880, 480, 480],
  [20, 230, 675, 675],
  [80, 370, 860, 860],

  [620, 940, 695, 695],
  [500, 810, 900, 900],
  [1200, 1500, 685, 685],

  [980, 1270, 900, 900],
  [1300, 1610, 805, 805],
  [1730, 1880, 870, 870],

  [20, 300, 125, 125],
  [560, 880, 125, 125],
  [1220, 1500, 125, 125],

  [10, 70, 425, 425],
  [200, 500, 385, 385],
  [630, 920, 410, 410],

  [1600, 1880, 480, 480],
  [20, 230, 675, 675],
  [80, 370, 860, 860],

  [980, 1270, 900, 900],
  [1300, 1610, 805, 805],
  [1730, 1880, 870, 870],

  [1045, 1320, 250, 250],
  [400, 730, 565, 565],
  [500, 810, 900, 900],
  //[minX, maxX, minY, maxY]
];

////////////////////////////////////////////////////////////

let click_cnt = 0;
let CLICK_LIMIT = 50;

////////////////////////////////////////////////////////////

class Sprite {
  constructor(img, x, y, speedX, speedY, visible = false) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.visible = visible;
  }

  update(minX, maxX, minY, maxY) {
    this.x += this.speedX;
    this.y += this.speedY;

    this.x = constrain(this.x, minX, maxX);
    this.y = constrain(this.y, minY, maxY);

    if (this.x === minX || this.x === maxX) {
      this.speedX *= -1;
    } else if (this.y === minY || this.y === maxY) {
      this.speedY *= -1;
    }

    for (let i = 0; i < sprites.length; i++) {
      if (sprites[i] !== this && sprites[i].visible) {
        if (
          collideRectRect(
            this.x,
            this.y,
            this.img.width,
            this.img.height,
            sprites[i].x,
            sprites[i].y,
            sprites[i].img.width,
            sprites[i].img.height
          ) &&
          cooltime <= 0
        ) {
          cooltime = 200;
          reproduce.play();

          // two sprites collide
          this.visible = true;
          sprites[i].visible = true;

          //shows four random cat images
          CLICK_LIMIT += 4;
          let randomIndexes = getRandomIndexes(NUM_OF_AVAILABLE_CATS, 4);
          for (let j = 0; j < randomIndexes.length; j++) {
            let index = randomIndexes[j];
            sprites[index].visible = true;
            sprites[index].x = areaLst[index][0];
            sprites[index].y = areaLst[index][2];
          }
          break;
        }
      }
    }
  }

  render() {
    if (this.visible) {
      image(this.img, this.x, this.y);
      if (this.speedX > 5) {
        this.speedX = 5;
      } else if (this.speedX < 0 && this.speedX < -1 * 5) {
        this.speedX = -5;
      }
      if (abss(mouseX - this.x) < 10 && abss(mouseY - this.y) < 10) {
        meow.play();
      }
    }
  }

  wasClicked(mouseX, mouseY) {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.img.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.img.height
    ) {
      trapped.play();
      this.visible = false;
    }
  }
}

////////////////////////////////////////////////////////////

let arcadegamer;
let tandy;

////////////////////////////////////////////////////////////

let links = {
  plat1:
    "https://raw.githubusercontent.com/jryliem25/Environment/main/Brick.png",
  plat2:
    "https://raw.githubusercontent.com/jryliem25/Environment/main/Stone.png",
  plat3:
    "https://raw.githubusercontent.com/jryliem25/Environment/main/Bush-Large.png",
  plat4:
    "https://raw.githubusercontent.com/jryliem25/Environment/main/Bush-Small.png",
  bg:
    "https://raw.githubusercontent.com/jryliem25/Bg/main/demo01_PixelSky_1920x1080.png",
};

////////////////////////////////////////////////////////////

let imagePaths = [
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/1.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/2.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/3.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/4.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/5.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/6.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/7.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/8.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/9.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/10.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/11.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/12.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/13.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/14.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/15.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/16.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/17.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/18.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/19.png",
  "https://raw.githubusercontent.com/jryliem25/Pixel-Cat/main/20.png",
];

////////////////////////////////////////////////////////////

const arcade_gamer_path =
  "https://raw.githubusercontent.com/jryliem25/Text/main/Arcade%20Gamer.otf";

const tandy_path =
  "https://raw.githubusercontent.com/jryliem25/Text/main/Pixel%20Tandy.otf";

////////////////////////////////////////////////////////////

let imgs = {};
let bg_plats = [
  ["bg", 0, 0],

  ["plat1", 500, 965],
  ["plat1", 1300, 875],
  ["plat2", 60, 930],
  ["plat2", 960, 965],
  ["plat2", 1740, 940],
  ["plat3", 800, 865],
  ["plat3", 1390, 965],

  ["plat1", -90, 745],
  ["plat1", 1180, 755],
  ["plat2", 620, 765],
  ["plat3", 320, 785],
  ["plat3", 1600, 770],
  ["plat4", 10, 835],
  ["plat4", 1030, 770],

  ["plat1", 400, 635],
  ["plat2", 1000, 615],
  ["plat3", 80, 615],
  ["plat3", 1700, 655],
  ["plat4", 840, 665],
  ["plat4", 1405, 625],

  ["plat1", 180, 455],
  ["plat1", 1120, 485],
  ["plat2", -250, 495],
  ["plat2", 620, 475],
  ["plat2", 1600, 550],

  ["plat1", 1015, 315],
  ["plat2", 250, 315],
  ["plat2", 1450, 365],
  ["plat3", 680, 315],
  ["plat3", -70, 295],
  ["plat4", 30, 385],

  ["plat1", -10, 195],
  ["plat1", 560, 195],
  ["plat2", 1200, 195],
  ["plat3", 1615, 195],
  ["plat4", 400, 195],
  ["plat4", 1010, 195],
];

////////////////////////////////////////////////////////////

function preload() {
  imgs["bg"] = loadImage(links["bg"]);
  imgs["plat1"] = loadImage(links["plat1"]);
  imgs["plat2"] = loadImage(links["plat2"]);
  imgs["plat3"] = loadImage(links["plat3"]);
  imgs["plat4"] = loadImage(links["plat4"]);

  ////////////////////////////////////////////////////////////

  arcadegamer = loadFont(arcade_gamer_path);

  tandy = loadFont(tandy_path);

  ////////////////////////////////////////////////////////////

  TNR = loadImage(
    "https://raw.githubusercontent.com/jryliem25/Epilogue/main/PLAY.png"
  );
  playbutton = loadImage(
    "https://raw.githubusercontent.com/jryliem25/Epilogue/main/PLAY%20BUTTON.png"
  );
  catpaw = loadImage(
    "https://raw.githubusercontent.com/jryliem25/Mouse/main/cat-paw.png"
  );
  clickme = loadImage(
    "https://raw.githubusercontent.com/jryliem25/Environment/main/CLICK%20ME.png"
  );

  ////////////////////////////////////////////////////////////

  bgm = loadSound(
    "https://raw.githubusercontent.com/jryliem25/BGM/main/BGM.mp3"
  );
  meow = loadSound(
    "https://raw.githubusercontent.com/jryliem25/BGM/main/Meow.mp3"
  );
  trapped = loadSound(
    "https://raw.githubusercontent.com/jryliem25/BGM/main/Click.mp3"
  );
  reproduce = loadSound(
    "https://raw.githubusercontent.com/jryliem25/BGM/main/Reproduce.mp3"
  );
  gameoversound = loadSound(
    "https://raw.githubusercontent.com/jryliem25/BGM/main/Game%20Over.mp3"
  );
  youwinsound = loadSound(
    "https://raw.githubusercontent.com/jryliem25/BGM/main/You%20Win.mp3"
  );

  ////////////////////////////////////////////////////////////

  vid = createVideo(
    "https://raw.githubusercontent.com/jryliem25/Epilogue/main/TNR%20Epilogue.mp4"
  );
  vid.size(videoWidth, videoHeight);

  ////////////////////////////////////////////////////////////

  for (let i = 0; i < imagePaths.length; i++) {
    let img = loadImage(imagePaths[i]);
    sprites.push(new Sprite(img, 0, 0, 0, 0));
  }
  for (let i = 20; i < 36; i++) {
    let img = loadImage(imagePaths[i - 16]);
    sprites.push(new Sprite(img, 0, 0, 0, 0));
  }
}

////////////////////////////////////////////////////////////

function pickRandomNumbers(totalNumber, pickNumber) {
  let numbers = [];
  for (let i = 0; i < totalNumber; i++) {
    numbers.push(i);
  }

  //picks two random numbers
  let randomNumbers = [];
  for (let i = 0; i < pickNumber; i++) {
    let index = Math.floor(Math.random() * numbers.length);
    let randomNumber = numbers[index];
    randomNumbers.push(randomNumber);
    numbers.splice(index, 1);
  }

  return randomNumbers;
}

//Collision

function collideRectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  //calculates the half widths and half heights of the rectangles
  const halfWidth1 = 15; //w1 / 2;
  const halfHeight1 = 15; //h1 / 2;
  const halfWidth2 = 15; //w2 / 2;
  const halfHeight2 = 15; //h2 / 2;

  //calculates the centers of the rectangles
  const centerX1 = x1 + halfWidth1;
  const centerY1 = y1 + halfHeight1;
  const centerX2 = x2 + halfWidth2;
  const centerY2 = y2 + halfHeight2;

  const dx = Math.abs(centerX2 - centerX1);
  const dy = Math.abs(centerY2 - centerY1);

  if (dx < halfWidth1 + halfWidth2 && dy < halfHeight1 + halfHeight2) {
    return true; // collided
  }

  return false; // not collided
}

function getRandomIndexes(maxIndex, count) {
  let indexes = [];
  for (let i = 0; i < maxIndex; i++) {
    indexes.push(i);
  }
  let randomIndexes = [];
  for (let i = 0; i < count; i++) {
    let randomIndex = floor(random(indexes.length));
    randomIndexes.push(indexes.splice(randomIndex, 1)[0]);
  }
  return randomIndexes;
}

////////////////////////////////////////////////////////////

function setup() {
  if (STATUS !== "GAME_START") {
    window.document.getElementsByTagName("main")[0].hidden = true;
  }
  vid.onended(function () {
    STATUS = "VIDEO_END_BUT_GAME_NOT_START";
    vid.hide();

    window.document.getElementsByTagName("main")[0].hidden = false;
  });

  createCanvas(1920, 1080);

  let randomNumbers = pickRandomNumbers(NUM_OF_AVAILABLE_CATS, 26);

  for (let i = 0; i < NUM_OF_AVAILABLE_CATS; i++) {
    sprites[i].x = random(constrainWidth(i));
    sprites[i].y = random(constrainHeight(i));
    sprites[i].speedX = random(0.5, 2.5);
    sprites[i].speedY = random(0.5, 2.5);
    sprites[i].visible = randomNumbers.includes(i);
  }

  noCursor();
}

////////////////////////////////////////////////////////////

//Width Constraint
function constrainWidth(index) {
  if (index === 0) {
    // Image 0 width constraint
    return [0, 30111110];
  } else if (index === 1) {
    // Image 1 width constraint
    return [0, 301010];
  }
  return [0, 300000];
}

//Height Constraint
function constrainHeight(index) {
  if (index === 0) {
    // Image 0 height constraint
    return [0, 300110];
  } else if (index === 1) {
    // Image 1 height constraint
    return [0, 31000];
  }
  return [0, 30000];
}

////////////////////////////////////////////////////////////

let isPlayGameOverSound = false;
let isPlayWinSound = false;
let tt = 0;

function draw() {
  checkGameStat();

  background(255);
  tt += 1;
  if (cooltime <= 0) {
    cooltime = 0;
  } else {
    cooltime -= 1;
  }

  if (STATUS === "VIDEO_NOT_YET_PLAY") {
    return;
  }
  if (STATUS === "VIDEO_PLAYING") {
    image(TNR, 0, 0);
    image(playbutton, 526, 614);

    videoWidth = TNR.width;
    videoHeight = TNR.height;

    return;
  }
  if (STATUS === "VIDEO_END_BUT_GAME_NOT_START") {
    image(TNR, 0, 0);
    image(playbutton, 526, 614);
    image(catpaw, mouseX, mouseY, 50, 50);

    return;
  }

  let catCnt = sprites.filter((sprite) => sprite.visible).length;
  if (catCnt === 0) {
    STATUS = "WIN";
  } else if (catCnt >= 36) {
    STATUS = "GAME_OVER";
  }
  if(STATUS == "GAME_START" && tt == 700){
    if(catCnt < 11){
      
       CLICK_LIMIT += 4;
          let randomIndexes = getRandomIndexes(NUM_OF_AVAILABLE_CATS, 4);
          for (let j = 0; j < randomIndexes.length; j++) {
            let index = randomIndexes[j];
            sprites[index].visible = true;
            sprites[index].x = areaLst[index][0];
            sprites[index].y = areaLst[index][2];
          }
       reproduce.play();
    }
  }
  if(STATUS == "GAME_START" && tt == 1000){
    if(catCnt < 11){
      
       CLICK_LIMIT += 4;
          let randomIndexes = getRandomIndexes(NUM_OF_AVAILABLE_CATS, 4);
          for (let j = 0; j < randomIndexes.length; j++) {
            let index = randomIndexes[j];
            sprites[index].visible = true;
            sprites[index].x = areaLst[index][0];
            sprites[index].y = areaLst[index][2];
          }
       reproduce.play();
    }
  }
  if(STATUS == "GAME_START" && tt == 1400){
    if(catCnt < 11){
      
       CLICK_LIMIT += 4;
          let randomIndexes = getRandomIndexes(NUM_OF_AVAILABLE_CATS, 4);
          for (let j = 0; j < randomIndexes.length; j++) {
            let index = randomIndexes[j];
            sprites[index].visible = true;
            sprites[index].x = areaLst[index][0];
            sprites[index].y = areaLst[index][2];
          }
       reproduce.play();
    }
  }
      if(STATUS == "GAME_START" && tt == 1600){
    if(catCnt < 11){
      
       CLICK_LIMIT += 4;
          let randomIndexes = getRandomIndexes(NUM_OF_AVAILABLE_CATS, 4);
          for (let j = 0; j < randomIndexes.length; j++) {
            let index = randomIndexes[j];
            sprites[index].visible = true;
            sprites[index].x = areaLst[index][0];
            sprites[index].y = areaLst[index][2];
          }
       reproduce.play();
    }
  }
  if (STATUS === "GAME_START") {
    for (let bg_plat of bg_plats) {
      image(imgs[bg_plat[0]], bg_plat[1], bg_plat[2]);
    }

    fill(255);
    textSize(width / 40);

    textAlign(RIGHT, TOP);
    textFont(arcadegamer);
    text("cat count:", width - 150, 65);
    textFont(tandy);
    text(catCnt.toString(), width - 80, 40);

    textAlign(LEFT, TOP);
    textFont(arcadegamer);
    text("mouse click:", 50, 65);
    textFont(tandy);
    text((CLICK_LIMIT - click_cnt).toString(), 365, 40);
  }
  if (STATUS === "GAME_OVER" || STATUS === "WIN") {
    image(imgs[bg_plats[0][0]], bg_plats[0][1], bg_plats[0][2]);
  }
  if (STATUS === "GAME_OVER") {
    fill(0);
    textAlign(CENTER, CENTER);
    textFont(arcadegamer);
    textSize(width / 6);
    text("game over", width / 2, height / 2);
    image(clickme, 668, 830);
  } else if (STATUS === "WIN") {
    fill(0);
    textAlign(CENTER, CENTER);
    textFont(arcadegamer);
    textSize(width / 6);
    text("you win", width / 2, height / 2);
    image(clickme, 668, 830);
  }
  if (STATUS !== "GAME_OVER") {
    let ss = sprites.filter((s, i) => s.visible);
    let lst = [];
    for (let i = 0; i < NUM_OF_AVAILABLE_CATS; i++) {
      if (sprites[i].visible) {
        lst.push(i);
      }
    }

    lst.forEach((i) => {
      var area = areaLst[i];
      sprites[i].update(area[0], area[1], area[2], area[3]);
      sprites[i].render();
    });
  }

  image(catpaw, mouseX, mouseY, 50, 50);
}

////////////////////////////////////////////////////////////

function mouseClicked() {
  if (STATUS === "WIN") {
    window.alert(
      "Congratulations! Now you know the importance of Neutering :)"
    );
    return;
  }
  if (STATUS === "GAME_OVER") {
    window.alert("Try again! Now you know the importance of Neutering :)");
    return;
  }
  if (STATUS === "VIDEO_NOT_YET_PLAY") {
    vid.play();
    STATUS = "VIDEO_PLAYING";
    return;
  }
  if (STATUS === "VIDEO_END_BUT_GAME_NOT_START") {
    STATUS = "GAME_START";
    bgm.loop();
    vid.hide();

    window.document.getElementsByTagName("main")[0].hidden = false;

    return;
  }
  if (STATUS === "VIDEO_PLAYING") {
    STATUS = "VIDEO_END_BUT_GAME_NOT_START";
    vid.remove();
    vid.hide();

    window.document.getElementsByTagName("main")[0].hidden = false;
    return;
  }
  if (STATUS === "GAME_START") {
    click_cnt += 1;
    if (click_cnt >= CLICK_LIMIT) {
      STATUS = "GAME_OVER";
      click_cnt = CLICK_LIMIT;
      return;
    }

    for (let i = 0; i < sprites.length; i++) {
      sprites[i].wasClicked(mouseX, mouseY);
    }
  }
}

////////////////////////////////////////////////////////////

function checkGameStat() {
  if (STATUS === "GAME_OVER") {
    bgm.stop();
    if (!isPlayGameOverSound) {
      gameoversound.play();
      isPlayGameOverSound = true;
    }
  } else if (STATUS === "WIN") {
    bgm.stop();
    if (!isPlayWinSound) {
      youwinsound.play();
      isPlayWinSound = true;
    }
  }
}
