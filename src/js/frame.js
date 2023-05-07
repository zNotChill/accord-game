
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

function lsGet(key) {
  return localStorage.getItem(key);
}

let intelligenceMax = 100;
let personalityMax = 100;
let reputationMax = 100;
let potentialMax = 100;

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
        id: 1,
        description: "Makes the idle income faster (requires Computer)",
        type: "test",
        unlocked: false,
        count: 0,
        max: 9,
        effect: {
          idleIncomeSpeed: 100,
        }
      },
      {
        name: "Computer",
        price: 100,
        id: 2,
        description: "Adds 3.5x to money multiplier and enables idle income",
        type: "test",
        unlocked: false,
        count: 0,
        effect: {
          enableIdleIncome: true,
          multiplier: 3.5,
        }
      },
      {
        name: "Book",
        price: 250,
        id: 3,
        description: "Adds 8x to money multiplier",
        type: "test",
        unlocked: false,
        count: 0,
        effect: {
          multiplier: 8,
        }
      },
    ];
    this.shopOpen = false;
    this.openShop = this.openShop;
  }
  rating() {
    const possible = intelligenceMax + personalityMax + reputationMax + potentialMax;
    const current = this.intelligence + this.personality + this.reputation + this.potential;
    return Math.floor((current / possible) * 100);
  }
  updateShop() {
    document.querySelector(".js-shop-popup").innerHTML = "";
    temp.shop.forEach((v) => {
      const el = document.createElement("div");
      el.classList.add("shop-item");
      el.setAttribute("data-shop-item-id", v.id);

      if(v.oneTime && v.count > 0 || v.count >= v.max) {
        el.classList.add("shop-item-disabled");
      }

      el.innerHTML = `
        <div class="shop-item-header">
          <div class="shop-item-name">${v.name}</div>
          <div class="shop-item-price">
            <strong class="accent">$</strong>
            <span class="shop-item-price-value">${v.price}</span>
            <small>|</small>
            <strong class="accent">${v.count}</strong>${v.max ? `<small>/</small><strong class="accent">${v.max}</strong>` : ""}
          </div>
          <small class="shop-item-description">${v.description}</small>
        </div>
        <a class="button shop-item-buy js-buy-item-shop">Buy</a>
        `
      document.querySelector(".js-shop-popup").appendChild(el);

      const buy = el.querySelector(".js-buy-item-shop");

      buy.addEventListener("click", () => {
        if(v.price > temp.player.money || v.oneTime && v.count > 0 || v.count >= v.max) return;
        temp.player.money -= v.price;
        
        const item = temp.shop.find((x) => x.id == v.id);
        item.count++;
        item.price = Math.floor(item.price * 1.5);

        bottomPopup(`You bought ${v.name} for $${v.price}!`);

        for (const i in item.effect) {
          const get = item.effect[i];
          
          if(
            i === "idleIncomeSpeed"
            ) {
            temp.player.idleIncomeSpeed -= get;
          } else {
            temp.player[i] += get;
          }
        }

        this.updateShop();
      })
    })
  }
  openShop() {
    spawnPopup({
      title: "Shop",
      content: `
        <div class="shop js-shop-popup">
        </div>
      `,
      buttons: [
        "close"
      ]
    });
    this.updateShop();
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