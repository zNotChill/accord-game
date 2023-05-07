
// This may seem redundant and completely stupid,
// but this completely resolves the issue where
// saving in the first session of the game would
// not work. No problem. You're welcome.
if(!sessionStorage.getItem("reloaded")) {
  window.location.reload();
  sessionStorage.setItem("reloaded", true);
}

for (let i = 0; i < 3; i++) {
  error("Close this if you do not know what you are doing!");
  log("Close this if you do not know what you are doing!");
}

const data = new Data();

const temp = data.temporary;

let game = null;

// What even is this

if(!data.dataExists()) {
  log(`No data found, creating new game...`);
  game = new Game();
  data.setData({
    game: game,
  });
  data.saveData();
} else {
  game = new Game(
    temp.game.reputation,
    temp.game.personality,
    temp.game.intelligence,
    temp.game.potential,
    temp.game.rating
  );
}

if(!temp.player) {
  temp.player = {
    money: 0,
    multiplier: 1,
    enableIdleIncome: false,
    idleIncomeSpeed: 1000,
  }
}
if(!temp.achievements) {
  temp.achievements = {
    achievements
  }
}
if(!temp.shop) {
  temp.shop = game.shop;
}

//

unlockAchievement(1);

function updateStats() {

  // game stats

  const dropdown = document.querySelector(".js-stats-dropdown");

  const intelligence = dropdown.querySelector(".js-game-attribute-intel");
  const personality = dropdown.querySelector(".js-game-attribute-personality");
  const reputation = dropdown.querySelector(".js-game-attribute-rep");
  const potential = dropdown.querySelector(".js-game-attribute-pot");
  const rating = dropdown.querySelector(".js-game-attribute-rating");

  const money = dropdown.querySelector(".js-game-attribute-money");
  const money2 = document.querySelector(".js-money");
  const moneyMulti = document.querySelector(".js-multiplier");

  intelligence.innerText = game.intelligence;
  personality.innerText = game.personality;
  reputation.innerText = game.reputation;
  potential.innerText = game.potential;
  rating.innerText = game.rating;

  // game stats

  money.innerText = temp.player.money;
  money2.innerText = temp.player.money;
  moneyMulti.innerText = `(x${temp.player.multiplier})`;
}

function createMoney() {
  temp.player.money += Math.floor(1 * temp.player.multiplier);
  updateStats();
}
function addMoney(amount) {
  temp.player.money += amount;
  updateStats();
}
function removeMoney(amount) {
  temp.player.money -= amount;
  updateStats();
}


let isResetting = false;
function reset() {
  spawnPopup({
    title: "Reset",
    content: "Are you sure you want to reset?",
    buttons: ["yes", "no"],
    onConfirm: () => {
      isResetting = true;
      location.href = "/"
      data.deleteData();

      setTimeout(() => {
        isResetting = false;
      }, 100);
    }
  });
}
function save() {
  data.saveData();
  log(`Saved data`);
  bottomPopup(`👀 Saved! However, saves are automatic!`)
}

initDropdowns();
initCli();

let updateInterval = 100;
let intervalIndex = 0;

setInterval(() => {
  updateStats();
  checkForMoneyAchievements();

  if(intervalIndex >= 10) {
    intervalIndex = 0;
    if(!isResetting) {
      data.saveData();
      log(`Saved data`);
    }
  } else {
    intervalIndex++;
  }

}, updateInterval);


// I'm way too stupid to actually add a proper idle income system, so I'm just gonna do this
setInterval(() => {
  console.log(`${temp.player.idleIncomeSpeed}`);
  if(temp.player.enableIdleIncome) {
    createMoney();
  }
}, temp.player.idleIncomeSpeed);