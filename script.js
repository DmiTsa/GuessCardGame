const attemptCode = 1;
const overCode = -1;
const winnerCode = 2;
const noneCode = 0;
const stack = [];

let stackLength;
let attempt;
let level = 0;
let mark = 0;

const createTiles = (n) => {
  let currentElementTile;
  for (let i = 0; i < n; i++) {
    currentElementTile = document.createElement("div");
    currentElementTile.id = i;
    currentElementTile.className = "tile tile_closed";
    field.appendChild(currentElementTile);
  }
  console.log("create tiles");
};

const resetTile = (sl) => {
  const allTile = document.querySelectorAll(".tile");

  let currentNode;
  for (let i = 0; i < sl; i++) {
    currentNode = allTile[i];
    currentNode.className = "tile tile_closed";
  }
};

const initLevel = (count, win, att, over) => {
  if (count < win + att) {
    alert("Initialization faled");
    return;
  }

  function rand(max) {
    return Math.floor(Math.random() * max);
  }

  for (let i = 0; i < win; i++) {
    let ind = rand(count);
    while (stack[ind] != noneCode) {
      ind = rand(count);
    }
    stack[ind] = winnerCode;
  }

  for (let i = 0; i < att; i++) {
    let ind = rand(count);
    while (stack[ind] != noneCode) {
      ind = rand(count);
    }
    stack[ind] = attemptCode;
  }

  for (let i = 0; i < over; i++) {
    let ind = rand(count);
    while (stack[ind] != noneCode) {
      ind = rand(count);
    }
    stack[ind] = overCode;
  }
};

const nullStack = (ct, nc) => {
  for (let i = 0; i < ct; i++) {
    stack[i] = nc;
  }
};

const newLevel = (gameLevel) => {
  console.log("new level");

  level++;
  if (level == levelsCount+1) {
    alert("Контратилэйшн епта!! еще разок?");
    attempt = 0;
    level = 0;
    location.reload();
  }
  info.textContent = `Rest attempts: ${attempt} Level: ${level}`;
  resetTile(stackLength);
  nullStack(stackLength, noneCode);
  const [winCount, attCount, overCount, descr] = gameLevel;
  initLevel(stackLength, winCount, attCount, overCount);
  alert(`Добро пожаловать на уровень ${level}! Карточек дополнительных попыток - ${attCount},  карточек победителя - ${winCount}, карточек проигрыша - ${overCount}. ${descr}`);
};

const fieldController = (e) => {
  let currentTileCode = stack[e.target.id];
  let currentElement = e.target;

  if (attempt > 0) {
    if (currentElement.classList.contains("tile_closed")) {
      currentElement.classList.remove("tile_closed");

      switch (currentTileCode) {
        case overCode:
          currentElement.classList.add("tile_over");
          gameOver();
          break;

        case attemptCode:
          currentElement.classList.add("tile_attempt");
          attempt++;
          attempt++;
          break;

        case winnerCode:
          currentElement.classList.add("tile_winner");
          footer.classList.remove("hidden");
          break;

        case noneCode:
          currentElement.classList.add("tile_none");
          break;
      }
      attempt--;
      info.textContent = `Rest attempts: ${
        attempt < 0 ? 0 : attempt
      } Level: ${level}`;
    }
  } else {
    alert("Попытки закончились!");
    gameOver();
  }
};

const footerController = (e) => {
  mark++;
  resetTile(stackLength);
  newLevel(gameLevels[mark]);
  footer.classList.add("hidden");
};

const resetController = (e) => {
  footer.textContent = "Начать заново";
  location.reload();
};

const settingsController = (e) => {
  let btn = e.target.id;

  switch (btn) {
    case "btn1":
      stackLength = 16;
      attempt = 20;
      break;
    case "btn2":
      stackLength = 24;
      attempt = 15;
      break;
    case "btn3":
      stackLength = 32;
      attempt = 10;
      break;
  }
  settings.classList.add("hidden");

  createTiles(stackLength);
  newLevel(gameLevels[mark]);
};

const gameOver = () => {
  attempt = 0;
  level = 0;
  footer.classList.add("hidden");

  field.removeEventListener("click", fieldController);
  footer.removeEventListener("click", footerController);
  // reset.removeEventListener("click", resetController);
  settings.removeEventListener("click", settingsController);
};

const field = document.querySelector(".field");
const footer = document.querySelector(".footer");
const reset = document.querySelector(".reset");
const settings = document.querySelector(".settings");
const info = document.querySelector(".info");

field.addEventListener("click", fieldController);
footer.addEventListener("click", footerController);
reset.addEventListener("click", resetController);
settings.addEventListener("click", settingsController);
