
// Copyright (c) zNotChill 2023. All rights reserved.

const help = [
  {
    title: "How to play",
    id: 0,
    points: {
      category: [
        "<h2>Shop</h2>",
        `
        To get started, click the <strong>Shop</strong> button to open the shop,
        then buy the Start item to get an instant boost of money.
        `,
        `
          You buy a <strong>Computer</strong> to enable idle income and increase your money multiplier.
          When you reach around <strong>$150</strong>, you can buy a <strong>Accelerator</strong> to increase your idle income speed.
        `
      ]
    }
  },
]

function setHelpPage(id) {
  const sidebar = document.querySelector(".help-sidebar");
  const content = document.querySelector(".help-content");

  const page = help.find((s) => s.id == id);

  content.innerHTML = `
    <h1>${page.title}</h1><br>
  `
  page.points.category.forEach((p) => {
    if(p.startsWith("<h2>")) {
      content.innerHTML += p;
    }
    else {
      content.innerHTML += `<p>${p}</p><br>`;
    }
  })
}

function openHelp() {
  unlockAchievement(12);
  spawnPopup({
    title: "Help",
    content: `
      <div class="help grid-2" style="column-gap: 30px">
        <div class="sidebar help-sidebar">
          ${help.map((s) => {
            return `<a class="button help-button button-sm" onclick="setHelpPage(${s.id})">${s.title}</a>`
          }).join("")}
        </div>
        <div class="help-content">
        </div>
      </div>
    `,
    buttons: [
      "close"
    ]
  });
  setHelpPage(0);
}