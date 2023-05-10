
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

const templateData = {
  player: {
    money: 0,
    multiplier: 1,
    enableIdleIncome: false,
    idleIncomeSpeed: 1000,
    level: 1,
    xp: 0,
    xpNeeded: 100,
  },
  achievements: {
    achievements
  },
  shop: game.shop,
}

for (const key in templateData) {
 if(!temp[key]) {
   temp[key] = templateData[key];
 }
 for (const key2 in templateData[key]) {
   if(!temp[key][key2]) {
     temp[key][key2] = templateData[key][key2];
   }
 }
}
// Check for shop changes
const ignoredShopKeys = [
  "count",
  "unlocked",
  "price",
]
temp.shop.forEach((v) => {
  Object.keys(v).forEach((i) => {
    if(!ignoredShopKeys.includes(i)) {
      if(v[i] != game.shop[v.id][i]) {
        v[i] = game.shop[v.id][i];
      }
    }
  })
})

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
      location.href = "./index.html"
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

      const fs = require("fs");
      const path = require("path");

      const savePath = path.join(__dirname + "/tempdata.json");
      const savePath2 = path.join(__dirname + "/tempdata.txt");

      fs.writeFileSync(savePath, JSON.stringify(temp), "utf-8", (err) => {
        if(err) {
          error(err);
        }
      });
      fs.writeFileSync(savePath2, JSON.stringify(temp.player.money), "utf-8", (err) => {
        if(err) {
          error(err);
        }
      });

      data.saveData();
    }
  } else {
    intervalIndex++;
  }

}, updateInterval);

// I'm way too stupid to actually add a proper idle income system, so I'm just gonna do this
function checkForIdleIncome() {
  if(temp.player.enableIdleIncome) {
    createMoney();
  }
}

let idleIncomeInterval = temp.player.idleIncomeSpeed;

let idleIncomeCode = () => {
  checkForIdleIncome();

  if(idleIncomeInterval != temp.player.idleIncomeSpeed) {
    idleIncomeInterval = temp.player.idleIncomeSpeed;
    clearInterval(idleIncome);
    idleIncome = setInterval(() => {
      idleIncomeCode();
    }, temp.player.idleIncomeSpeed);
  }
}
let idleIncome = setInterval(() => {
  idleIncomeCode();
}, temp.player.idleIncomeSpeed);
