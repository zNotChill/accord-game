const possibleButtons = {
  confirm: `Confirm`,
  cancel: `Cancel`,
  ok: `OK`,
  yes: `Yes`,
  no: `No`,
  close: `Close`,
  save: `Save`,
  load: `Load`,
  delete: `Delete`,
  export: `Export`,
  import: `Import`,
}

function spawnPopup({
  title,
  content,
  buttons,
  onConfirm,

}) {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
    <div class="popup-wrapper">
      <div class="popup-header">
        <div class="popup-title">${title}</div>
        <div class="popup-close">X</div>
      </div>
      <div class="popup-body">
        ${content}
      </div>
      <div class="popup-footer">
        ${buttons.map(button => {
          return `<a class="button" id="button-popup-${button}" href="#">${possibleButtons[button]}</a>`
        }).join("")}
      </div>
    </div>
  `;
  document.querySelector("#app").appendChild(popup);
  popup.querySelector(".popup-wrapper").style.display = "block";
  popup.querySelector(".popup-close").addEventListener("click", () => {
    popup.remove();
  })
  buttons.forEach(button => {
    popup.querySelector(`#button-popup-${button}`).addEventListener("click", () => {
      popup.remove();
      if(button === "yes" || button === "ok") onConfirm(button);
    })
  });
}

let bottomPopups = 0;

function bottomPopup(content) {
  const popup = document.createElement("div");
  popup.innerHTML = `
    <div class="bottom-popup-wrapper">
      ${content}
    </div>
  `;
  bottomPopups++;
  document.querySelector(".bottom-popup .wrapper").appendChild(popup);
  popup.style.display = "block";
  document.querySelector(".bottom-popup").style.display = "block";

  setTimeout(() => {
    popup.remove();
    bottomPopups--;
  }, 3000);
}

function fullscreenPopup(
  {
    title,
    content,
    buttons,
    onConfirm,
  }
) {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.classList.add("popup-fs");
  popup.innerHTML = `
    <div class="popup-wrapper">
      <div class="popup-header">
        <div class="popup-title">${title}</div>
        <div class="popup-close">X</div>
      </div>
      <div class="popup-body">
        ${content}
      </div>
      <div class="popup-footer">
        ${buttons.map(button => {
          return `<a class="button" id="button-popup-${button}" href="#">${possibleButtons[button]}</a>`
        }).join("")}
      </div>
    </div>
  `;
  document.querySelector("#app").appendChild(popup);
  popup.querySelector(".popup-wrapper").style.display = "block";
  popup.querySelector(".popup-close").addEventListener("click", () => {
    popup.remove();
  })
  buttons.forEach(button => {
    popup.querySelector(`#button-popup-${button}`).addEventListener("click", () => {
      popup.remove();
      if(button === "yes" || button === "ok") onConfirm(button);
    })
  });
}