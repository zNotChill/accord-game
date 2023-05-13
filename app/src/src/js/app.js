
// Copyright (c) zNotChill 2023. All rights reserved.

// This may seem redundant and completely stupid,
// but this completely resolves the issue where
// saving in the first session of the game would
// not work. No problem. Youre welcome.
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
    gameState: "Idle",
    frenzy: {
      active: false,
      time: 0,
      multiplier: 1,
    }
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

// Check for achievement changes
const ignoredAchievementKeys = [
  "unlocked",
  "unlockedAt",
]
achievements.forEach((v, i) => {
  Object.keys(v).forEach((e) => {
    if(!ignoredAchievementKeys.includes(e)) {
      if(!temp.achievements.achievements[i]) {
        temp.achievements.achievements[i] = v;
      }
      if(temp.achievements.achievements[i][e] != v[e]) {
        temp.achievements.achievements[i][e] = v[e];
      }
    }
  });
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

  intelligence.innerText = intToString(game.intelligence);
  personality.innerText = intToString(game.personality);
  reputation.innerText = intToString(game.reputation);
  potential.innerText = intToString(game.potential);
  rating.innerText = intToString(game.rating);

  // game stats

  money.innerText = intToString(temp.player.money);
  if(temp.player.money > 100000000000) {
    money2.innerText = intToString(temp.player.money);
  } else {
    money2.innerText = temp.player.money.toLocaleString('en-US');
  }
  moneyMulti.innerText = `(x${intToString(temp.player.multiplier)})`;
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
let frenzyCheck = false;

gameState("Idle");

setInterval(() => {
  updateStats();
  checkForMoneyAchievements();

  if(temp.player.frenzy.time === 30) {
    frenzyCheck = true;
  }
  if(!frenzyCheck && temp.player.frenzy.time !== 30 && temp.player.frenzy.active) {
    frenzyCheck = true;
    game.activateFrenzy(temp.player.frenzy.time);
  }

  if(intervalIndex >= 10) {
    intervalIndex = 0;
    if(!isResetting) {

      const fs = require("fs");
      const path = require("path");

      const savePath2 = path.join(__dirname + "/tempdata.txt");

      let parse = [
        temp.player.money,
        temp.player.multiplier,
        temp.player.idleIncomeSpeed,
        temp.player.gameState
      ];

      fs.writeFileSync(savePath2, parse.join(" | "), "utf-8", (err) => {
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
