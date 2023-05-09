const rpc = require("discord-rpc");
const fs = require("fs");
const client = new rpc.Client({ transport: 'ipc' });
let config = {};
let start = Date.now();

client.login({ clientId: "858802945398931489" }).catch(console.error);

client.on('ready', () => {
  
  console.log('[DEBUG] Presence now active!')
  console.log('[WARN] Do not close this Console as it will terminate the rpc')
  console.log('=================== Error Output ===================')
  setInterval(() => {
    const data = fs.readFileSync(__dirname + "/tempdata.txt", "utf-8");

    config = {
      "LargeImage": "moneysim-rpc",
      "State": `$${data} earned`,
    }  
    client.request('SET_ACTIVITY', {
      pid: process.pid,
      activity: {
          state: config.State,
          timestamps: {
            start: start,
          },
          assets: {
            large_image: config.LargeImage,
          },
      }
    })
  }, 1000);
})