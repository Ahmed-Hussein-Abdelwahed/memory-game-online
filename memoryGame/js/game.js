let clickedImgs = [];
let gameTimer = null;

document.getElementById("startBtn").onclick = function () {
  // generate board 40 pictures
  document.getElementById("board").innerHTML = "";
  document.getElementById("board").style.visibility = "visible";
  const gameSize = 40;
  let pictures = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
    "images/7.jpg",
    "images/8.jpg",
    "images/9.jpg",
    "images/10.jpg",
    "images/11.jpg",
    "images/12.jpg",
    "images/13.jpg",
    "images/14.jpg",
    "images/15.jpg",
    "images/16.jpg",
    "images/17.jpg",
    "images/18.jpg",
    "images/19.jpg",
    "images/20.jpg",
    "images/21.jpg",
    "images/22.jpg",
    "images/23.jpg",
    "images/24.jpg",
    "images/25.jpg",
    "images/26.jpg",
    "images/27.jpg",
    "images/28.jpg",
    "images/29.jpg",
    "images/30.jpg",
    "images/31.jpg",
    "images/32.jpg",
    "images/33.jpg",
    "images/34.jpg",
    "images/35.jpg",
    "images/36.jpg",
    "images/37.jpg",
    "images/38.jpg",
    "images/39.jpg",
    "images/40.jpg",
    "images/41.jpg",
    "images/42.jpg",
    "images/43.jpg",
    "images/44.jpg",
    "images/45.jpg",
    "images/46.jpg",
    "images/47.jpg",
    "images/48.jpg",
    "images/49.jpg",
    "images/50.jpg",
    "images/51.jpg",
    "images/52.jpg",
    "images/53.jpg",
    "images/54.jpg",
    "images/55.jpg",
    "images/56.jpg",
    "images/57.jpg",
    "images/58.jpg",
    "images/59.jpg",
    "images/60.jpg",
    "images/61.jpg",
    "images/62.jpg",
    "images/63.jpg",
    "images/64.jpg",
    "images/65.jpg",
    "images/66.jpg",
    "images/67.jpg",
    "images/68.jpg",
    "images/69.jpg",
    "images/70.jpg",
    "images/71.jpg",
    "images/72.jpg",
    "images/73.jpg",
    "images/74.jpg",
  ];

  let picSet = new Set();
  while (picSet.size !== gameSize / 2) {
    picSet.add(pictures[Math.floor(Math.random() * pictures.length)]);
  }
  let picArr = [...picSet, ...picSet];
  let gamePictures = shuffle(picArr);
  intializeGameBoard(gamePictures, gameSize);
  startGame();
};

function intializeGameBoard(picsArr, size) {
  let board = document.getElementById("board");

  for (let i = 0; i < picsArr.length; i++) {
    // board.innerHTML += `<div class="card-cont"></div>`;
    board.innerHTML += `<div class="card-cont">
                       <img src="${picsArr[i]}" alt="Picture to match" class="card"/>
                       </div>`;
  }
  document.getElementById("timer-cont").style.visibility = "visible";
  document.getElementById("score-cont").style.visibility = "visible";
  document.getElementById("finalScore").innerHTML = size / 2;
  document.getElementById("score").innerHTML = 0;
  document.getElementById("minutes").innerHTML = "00";
  document.getElementById("seconds").innerHTML = "00";
  gameTimer = setInterval(timer, 1000);
}

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex],array[currentIndex]];
  }
  return array;
}

function startGame() {
  let cardsCont = document
    .getElementById("board")
    .querySelectorAll(".card-cont");

  cardsCont.forEach(function (card) {
    card.addEventListener("click", handelClick);
  });
}

function handelClick(event) {
  let card = event.target;
  card.querySelector("img").style.visibility = "visible";
  clickedImgs.push(card);

  if (clickedImgs.length === 2) {
    document.getElementById("board").style.pointerEvents = "none";
    // to disable user from unhideing more than 2 pictures
    let img1 = clickedImgs[0].querySelector("img");
    let img2 = clickedImgs[1].querySelector("img");

    setTimeout(function () {
      // compare after 2 seconds
      if (img1.src === img2.src) {
        clickedImgs[0].style.visibility = "hidden";
        clickedImgs[1].style.visibility = "hidden";
        img1.style.visibility = "hidden";
        img2.style.visibility = "hidden";
        let score = parseInt(document.getElementById("score").innerHTML);
        score += 1;
        document.getElementById("score").innerHTML = score;
        if (score === 20) {
          // game end check
          clearInterval(gameTimer);
          document.getElementById("board").style.visibility = "hidden";
        }
      } else {
        img1.style.visibility = "hidden";
        img2.style.visibility = "hidden";
      }
      clickedImgs = [];
      document.getElementById("board").style.pointerEvents = "auto";
    }, 1000);
  }
}

function timer() {
  let minutes = parseInt(document.getElementById("minutes").innerHTML);
  let seconds = parseInt(document.getElementById("seconds").innerHTML);
  seconds += 1;

  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }

  if (seconds < 10) {
    document.getElementById("seconds").innerHTML = "0" + seconds;
  } else {
    document.getElementById("seconds").innerHTML = seconds;
  }

  if (minutes < 10) {
    document.getElementById("minutes").innerHTML = "0" + minutes;
  } else {
    document.getElementById("minutes").innerHTML = minutes;
  }
}

document.getElementById("resetBtn").onclick = function () {
  location.reload();
};
