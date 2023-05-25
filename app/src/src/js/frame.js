
// Copyright (c) zNotChill 2023. All rights reserved.

let fixedLogStyle = `border-radius: 5px; font-weight: 900; font-size: 12px`;
let fixedLogMessageStyle = `font-size: 11px;`;

log = (log) => {
  console.log("%c SIM %c " + log, `background-color: #54c15d; color: #000; ${fixedLogStyle}`, fixedLogMessageStyle);
}
error = (log) => {
  console.log("%c SIM %c " + log, `background-color: red; ${fixedLogStyle}`, fixedLogMessageStyle);
}
info = (log) => {
  console.log("%c SIM %c " + log, `background-color: lightblue; color: #000; ${fixedLogStyle}`, fixedLogMessageStyle);
}

function findSetting(setting) {
  return temp.settings.find(x => x.id === setting);
}

function gameState(state) {
  temp.player.gameState = state;
  data.saveData();
}

function lsGet(key) {
  return localStorage.getItem(key);
}
function formatNum(num) {
  return num.toLocaleString('en-US');
}
const intToString = num => {
  num = num.toString().replace(/[^0-9.]/g, '');
  if (num < 1000) {
      return num;
  }
  let si = [
    {v: 1E3, s: "K"},
    {v: 1E6, s: "M"},
    {v: 1E9, s: "B"},
    {v: 1E12, s: "T"},
    {v: 1E15, s: "P"},
    {v: 1E18, s: "E"}
    ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
          break;
      }
  }
  return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
};


class Game {
  constructor(r, p, i, po, ra) {
    this.reputation = r || 0;
    this.personality = p || Math.floor(Math.random() * 100) + 1;
    this.intelligence = i || Math.floor(Math.random() * 100) + 1;
    this.potential = po || Math.floor(Math.random() * 100) + 1;
    this.rating = ra || this.rating();

    this.shop = [
      {
        name: "Start",
        price: 0,
        id: 0,
        description: "Start your journey! Gives you $100",
        type: "test",
        unlocked: false,
        count: 0,
        oneTime: true,
        effect: {
          money: 100,
        }
      },
      {
        name: "Accelerator",
        price: 150,
        plusPrice: 200,
        id: 1,
        description: "Makes the idle income faster (requires Computer)",
        type: "test",
        unlocked: false,
        count: 0,
        max: 24,
        effect: {
          idleIncomeSpeed: 40,
        }
      },
      {
        name: "Computer",
        price: 100,
        plusPrice: 150,
        id: 2,
        description: "Adds 1.5x to money multiplier, enables idle income, unlocks Accelerator, and adds 1 to intelligence",
        type: "test",
        unlocked: false,
        count: 0,
        effect: {
          enableIdleIncome: true,
          multiplier: 1.5,
        }
      },
      {
        name: "Book",
        price: 250,
        plusPrice: 300,
        id: 3,
        description: "Adds 4x to money multiplier and adds 1 to intelligence",
        type: "test",
        unlocked: false,
        count: 0,
        effect: {
          multiplier: 4,
          intelligence: 1,
        }
      },
      {
        name: "Bookshelf",
        price: 5000,
        plusPrice: 600,
        id: 4,
        description: "Adds 15x to money multiplier and adds 1 to intelligence",
        type: "test",
        unlocked: false,
        count: 0,
        effect: {
          multiplier: 15,
          intelligence: 1,
        }
      },
      {
        name: "Library",
        price: 100000,
        plusPrice: 10000,
        id: 5,
        description: "Adds 150x to money multiplier and adds 50 to intelligence",
        type: "test",
        unlocked: false,
        count: 0,
        effect: {
          multiplier: 150,
          intelligence: 50,
        }
      },


    ];
    this.shopOpen = false;
    this.openShop = this.openShop;
  }
  rating() {
    const current = this.intelligence + this.personality + this.reputation + this.potential;
    return current / 10;
  }
  updateShop() {

    document.querySelector(".js-item-popup").innerHTML = "";
    
    function calculatePriceFor(item, num) {
      let total = item.price;

      let count = item.count;
      for (let i = 0; i < num; i++) {
        let plus = item.plusPrice || 0;
        count++;
        total += Math.floor(item.price * (0.2 * (item.price / (item.price * (count / 4)))) + plus);
      }

      return total;
    }

    // columns

    const maxColumns = 3;
    const maxItemsPerCol = 4;

    for (let i = 0; i < maxColumns; i++) {
      const el = document.createElement("div");
      el.classList.add("item-column");
      el.setAttribute("data-item-column-id", i);
      document.querySelector(".js-item-popup").appendChild(el);
    
      for (let e = 0; e < maxItemsPerCol; e++) {
        var item = temp.shop[i * maxItemsPerCol + e];
        if(!item) return;

        const it = document.createElement("div");
        it.classList.add("item");

        const enough = playerHasEnough(item);

        console.log(item.count > 0 || 
          item.max && item.count >= item.max ||
          enough === false);
        if(
          item.count > 0 || 
          item.max && item.count >= item.max ||
          enough === false
        ) {
          it.classList.add("item-disabled");
        }

        it.innerHTML = `
          <div class="item-header">
            <div class="item-title">
              <span class="item-name">
                ${item.name}
              </span>
              <small>&bull;</small>
              <span class="item-price">
                <strong class="accent">$</strong>
                <span class="item-price-value">${formatNum(item.price)}</span>
                <small>|</small>
                <strong class="accent">${item.count}</strong>${item.max ? `<small>/</small><strong class="accent">${item.max}</strong>` : ""}
              </span>
            </div>
            <small class="item-description">${item.description}</small>
          </div>
          `
        el.appendChild(it);

        function playerHasEnough(item) {
          const price = temp.player.money >= item.price;

          console.log(`${price} price`);
          return price;
        }

        function buy() {
          var v = temp.shop[i * maxItemsPerCol + e];
          if(v.price > temp.player.money || v.oneTime && v.count > 0 || v.count >= v.max) return;
          temp.player.money -= v.price;
          
          const item = temp.shop.find((x) => x.id == v.id);
          item.count++;
          
          if(item.price > 0) {
            let plus = item.plusPrice || 0;
            item.price += Math.floor(item.price * (0.2 * (item.price / (item.price * (item.count / 4)))) + plus);
          }

          for (const i in item.effect) {
            const get = item.effect[i];
            
            if(
              i === "idleIncomeSpeed"
            ) {
              temp.player.idleIncomeSpeed -= get;
            } else {
              if(temp.player[i] === null) {
                if(temp.game[i]) {
                  temp.game[i] += get;
                } else {
                  bottomPopup(`Error while buying ${v.name}! Invalid effect <strong class="accent">${i}</strong>!`);
                }
              } else {
                temp.player[i] += get;
              }
            }
          }

        }

        it.addEventListener("click", () => {
          unlockAchievement(11);

          for (let i = 0; i < parseInt(temp.player.buyCount); i++) {
            buy();
            this.updateShop();
          }
        });

      }
    }
  }
  openAchievements() {
    gameState("Exploring Achievements");
    unlockAchievement(13);
    let content = ``;
    temp.achievements.achievements.forEach((v) => {
      content += `
        <div class="achievement">
          <strong class="${v.unlocked ? "accent" : ""}">${v.unlocked ? "<span class='cli-type-log'>(✓) </span>" : ""}${v.name}</strong>
          <small>${v.description}</small>
        </div>
        
          
      `;
    })
    spawnPopup({
      title: "Achievements",
      content: `
        <div class="achievements js-achievements-popup">
          ${content}
        </div>
      `,
      buttons: [
        "close"
      ]
    });

  }
  openShop() {
    gameState("Exploring Shop");
    unlockAchievement(14);
    // <div class="shop-buy-count end">
    //   <a class="button button-sm" onclick="temp.player.buyCount = 1;">1x</a>
    //   <a class="button button-sm" onclick="temp.player.buyCount = 10;">10x</a>
    //   <a class="button button-sm" onclick="temp.player.buyCount = 100;">100x</a>
    // </div>
    spawnPopup({
      title: "Shop",
      content: `
        <div class="shop js-item-popup grid-2">
        </div>
      `,
      buttons: [
        "close"
      ]
    });
    this.updateShop();
  }

  openTasks() {
    gameState("Exploring Tasks");
    unlockAchievement(15);
    spawnPopup({
      title: "Tasks",
      content: `
        coming soon™️
      `,
      buttons: [
        "close"
      ]
    });
  }

  // Settings

  openSettings() {
    gameState("Exploring Settings");
    unlockAchievement(16);
    spawnPopup({
      title: "Settings",
      content: `
        <div class="settings">
        </div>
      `,
      buttons: [
        "close"
      ]
    });

    for (const i in temp.settings) {
      const v = temp.settings[i];

      const el = document.createElement("div");
      el.classList.add("setting");
      el.innerHTML = `
        <div class="upper">
          <input class="toggle" type="checkbox" id="setting-${i}" ${v.enabled ? "checked" : ""}>
          <strong>${v.name}</strong>
        </div>
        <small>${v.description}</small>
      `;
      
      const toggle = el.querySelector("input.toggle");
      toggle.addEventListener("change", () => {
        if(v.enabled) {
          v.enabled = false;
          toggle.checked = false;
        } else {
          v.enabled = true;
          toggle.checked = true;
        }
      });

      const popup = document.querySelector(".popup-wrapper");
  
      popup.querySelector(".popup-body").appendChild(el);
    }

  }

  activateFrenzy(time = 30) {
    const frenzy = temp.player.frenzy;

    frenzy.active = false;

    const m = 100 * temp.player.multiplier;

    frenzy.time = time;
    frenzy.active = true;
    frenzy.multiplier = m;
    temp.player.gameState = `Active Frenzy (${frenzy.time}s)`;

    bottomPopup("Frenzy activated! +$" + intToString(m) + " per second for " + frenzy.time + " seconds!");

    const root = document.querySelector(":root");
    var accentHue = getComputedStyle(root).getPropertyValue("--accent-hue");
    var tempHue = parseInt(accentHue);

    const setHue = (hue) => {
      document.querySelector("html").style.setProperty("--accent-hue", hue);
    }

    let timer = 0;
    let interval = setInterval(() => {
      tempHue += 5;
      if(tempHue >= 360) {
        setHue(125);
      }
      setHue(tempHue);
      timer++;
      if(timer === 10) {
        timer = 0;
          
        frenzy.time--;
        temp.player.gameState = `Active Frenzy (${frenzy.time}s)`;
        if(frenzy.time === 0) {
          frenzy.active = false;
          frenzy.time = 0;
          temp.player.gameState = "Idle";
          clearInterval(interval);
          return;
        }
        temp.player.money += m;
      }
    }, 100);

  }
}

class Data {
  constructor() {
    this.loadData();
  }
  setData(data) {
    this.temporary = data;
  }
  saveData() {
    const data = JSON.stringify(this.temporary);
    localStorage.setItem('msm-data', data);
  }
  loadData() {
    if(!lsGet('msm-data')) return this.setData([]);
    const data = lsGet('msm-data');
    this.temporary = JSON.parse(data);
  }
  deleteData() {

    if(sessionStorage.getItem("reloaded")) {
      sessionStorage.removeItem("reloaded");
    }

    localStorage.removeItem('msm-data');
  }
  dataExists() {
    if(!lsGet('msm-data')) return false;
    return true;
  }
  export() {
    if(this.temporary = []) return;
    const data = JSON.stringify(this.temporary);
    const blob = new Blob([data], {type: 'text/plain'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `msm-save-data.json`;
    a.click();
    document.body.appendChild(a);
  }
}

function goBack(num) {
  const value = Date.now() - (86400000 * num);
  return new Date(value).toLocaleString();
}