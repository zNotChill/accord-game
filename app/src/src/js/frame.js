
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
        max: 20,
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
    ];
    this.shopOpen = false;
    this.openShop = this.openShop;
  }
  rating() {
    const current = this.intelligence + this.personality + this.reputation + this.potential;
    return current / 10;
  }
  updateShop() {

    document.querySelector(".js-shop-popup").innerHTML = "";
    
    // columns

    const maxColumns = 3;
    const maxItemsPerCol = 5;

    for (let i = 0; i < maxColumns; i++) {
      const el = document.createElement("div");
      el.classList.add("shop-column");
      el.setAttribute("data-shop-column-id", i);
      document.querySelector(".js-shop-popup").appendChild(el);
    
      for (let e = 0; e < maxItemsPerCol; e++) {
        var item = temp.shop[i * maxItemsPerCol + e];
        if(!item) return;

        const it = document.createElement("div");
        it.classList.add("shop-item");

        if(item.oneTime && item.count > 0 || item.count >= item.max) {
          it.classList.add("shop-item-disabled");
        }

        it.innerHTML = `
          <div class="shop-item-header">
            <div class="shop-item-name">${item.name}</div>
            <div class="shop-item-price">
              <strong class="accent">$</strong>
              <span class="shop-item-price-value">${item.price}</span>
              <small>|</small>
              <strong class="accent">${item.count}</strong>${item.max ? `<small>/</small><strong class="accent">${item.max}</strong>` : ""}
            </div>
            <small class="shop-item-description">${item.description}</small>
          </div>
          <a class="button shop-item-buy js-buy-item-shop">Buy</a>
          `
        el.appendChild(it);

        const buy = it.querySelector(".js-buy-item-shop");
        buy.addEventListener("click", () => {
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

          this.updateShop();

        });

      }
    }
  }
  openAchievements() {
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
    spawnPopup({
      title: "Shop",
      content: `
        <div class="shop js-shop-popup grid-2">
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