
var commands = [
  {
    name: "help",
    description: "Displays all commands",
    usage: "help",
    visible: false,
    run: (args) => {
      let output = `
        <div class="cli-output-text js-cli-output-text cli-type-log">
          List of commands:
        </div>
      `;
      commands.forEach((v) => {
        if(v.visible) {
          output += `
            <div class="cli-output-text js-cli-output-text cli-type-info">
              <span class="cli-command-name">${v.name}</span> - ${v.description}
            </div>
          `;
        }
      });
      return `
        ${output}
      `;
    }
  },
  {
    name: "hello",
    description: "Says hello",
    usage: "hello",
    visible: true,
    run: (args) => {
      return `
        Hello!
      `;
    }
  },
  {
    name: "clear",
    description: "Clears the console",
    usage: "clear",
    visible: true,
    run: (args) => {
      document.querySelector(".js-cli-output").innerHTML = "";
      return `
        Cleared console!
      `;
    }
  },
  {
    name: "game",
    description: "Displays game info",
    usage: "game",
    visible: true,
    run: (args) => {

      let output = `
        <div class="cli-output-text js-cli-output-text cli-type-log">
          Your game:
        </div>
      `;

      output += `
        <div class="cli-output-text js-cli-output-text cli-type-log">
          ------------
        </div>
        <div class="cli-output-text js-cli-output-text cli-type-info">
          Intelligence: ${game.intelligence}
        </div>
        <div class="cli-output-text js-cli-output-text cli-type-info">
          Personality: ${game.personality}
        </div>
        <div class="cli-output-text js-cli-output-text cli-type-info">
          Potential: ${game.potential}
        </div>
        <div class="cli-output-text js-cli-output-text cli-type-info">
          Reputation: ${game.reputation}
        </div>
        <div class="cli-output-text js-cli-output-text cli-type-log">
          ------------
        </div>
        <div class="cli-output-text js-cli-output-text cli-type-info">
          Rating: ${game.rating}
        </div>
      `

      return output;
    }
  },
  {
    name: "achievements",
    description: "Displays achievements",
    usage: "achievements",
    visible: true,
    run: (args) => {
      let output = `
        <div class="cli-output-text js-cli-output-text cli-type-log">
          Achievements:
        </div>
      `;
      let ending = `(✓)`;
      temp.achievements.achievements.forEach((v) => {
        log(v.unlocked);
        output += `
          <div class="cli-output-text js-cli-output-text cli-type-info">
            ${v.name}: ${v.description} ${v.unlocked ? ending : ""}
          </div>
        `;
      });
      return output;
    }
  }

]

var cliInit = false;

function writeToCli(text, type) {
  if(!cliInit) return error(`Cli has not been initialized!`);

  text.replace(/\n/g, "<br>");

  // TODO: Fix this later, user-generated content with innerHTML is an awful idea
  document.querySelector(".js-cli-output").innerHTML += `
    <div class="cli-output-text js-cli-output-text cli-type-${type}">${text}</div>
  `;
}

var cliActivated = false;
var cliCommands = 0;

function initCli() {

  if(cliInit) return error(`Cli has already been initialized!`);

  cliInit = true;
  log(`Initialized Cli`);

  const cli = document.createElement("div");
  cli.classList.add("cli");
  cli.classList.add("js-cli");

  cli.innerHTML = `
    <div class="cli-wrapper">
      <div class="cli-body">
        <div class="cli-output js-cli-output">
          <br>
          <div class="cli-output-text js-cli-output-text">
            Simulator Cli
          </div>
          
          <br>

          <div class="cli-output-text js-cli-output-text">
            Type "help" for a list of commands
          </div>
          <br>
          
          <span class="cli-output-text js-cli-output-text js-input">
            <span class="cli-output-text js-cli-output-text">
              <span class="cli-type-log">$</span>
              <span class="cli-type-debug">~</span>
            </span>
            <span type="text" class="empty cli-input-text js-cli-input-text"></span>
          </span>
        </div>
      </div>
    </div>
  `;
  document.querySelector("#app").appendChild(cli);
  cli.style.display = "none";

  document.addEventListener("keydown", (e) => {
    if(!cliActivated) return;
    const regex = /^[A-Za-z0-9\s]*$/;

    if(e.keyCode === 32) {
      const value = cli.querySelector(".js-cli-input-text");
      value.innerHTML += "&nbsp;";
    }
    if(regex.test(e.key) && e.key.length === 1) {
      const value = cli.querySelector(".js-cli-input-text");
      value.innerText += e.key;
    }
    if(e.key === "Backspace") {
      const value = cli.querySelector(".js-cli-input-text");
      value.innerText = value.innerText.slice(0, -1);
    }  
    if(e.key === "Enter") {
      const input = cli.querySelector(".js-cli-input-text").innerText;
      cli.querySelector(".js-cli-input-text").innerText = "";
      log(`CLI Input: ${input}`);
      cli.focus();

      // Commands

      const cmd = input.split(" ")[0];
      const args = input.split(" ").splice(1);

      let commandValid = false;
      commands.find(command => {
        if(command.name === cmd) {
          writeToCli(command.run(args), "normal");
          commandValid = true;
          return true;
        }
      })

      if(!commandValid) {
        writeToCli(`Command "${input}" not found!`, "error");
      }

      // Move the input to the bottom
      const inputNode = document.querySelector(".cli-body .js-cli-input-text");

      console.log(inputNode.innerText );
      inputNode.classList.remove("js-cli-input-text");
      inputNode.innerText = input;
      const newInput = document.createElement("span");

      newInput.innerHTML = inputNode.parentNode.innerHTML;
      newInput.classList.add("js-input");
      newInput.classList.add("cli-output-text");
      newInput.classList.add("js-cli-output-text");

      newInput.querySelector(".cli-input-text").classList.add("js-cli-input-text");
      newInput.querySelector(".js-cli-input-text").innerText = "";

      cli.querySelector(".js-cli-output").appendChild(newInput);

    }
    cliCommands++;
  })

  document.addEventListener("keyup", (e) => {
    if(e.key === "`") {
      if(cliActivated) {
        cli.style.display = "none";
        cliActivated = false;
      } else {
        cli.style.display = "block";
        cliActivated = true;
      }

    }
  })
}