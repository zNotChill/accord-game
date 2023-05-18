
// Copyright (c) zNotChill 2023. All rights reserved.

const rpc = require("discord-rpc");
const fs = require("fs");
const client = new rpc.Client({ transport: 'ipc' });
let config = {};
let start = Date.now();

if(findSetting('discord-rpc').enabled === true) {
  begin();
} else {
  log('Discord RPC is disabled. Skipping...');
}

function begin() {
  client.login({ clientId: "858802945398931489" }).catch(console.error);

  client.on('ready', () => {
    
    console.log('[DEBUG] Presence now active!')
    console.log('=================== Error Output ===================')
    setInterval(() => {
      let money = temp.player.money;
      let multiplier = temp.player.multiplier;
      let idleIncomeSpeed = temp.player.idleIncomeSpeed;
      let gameState = temp.player.gameState;
      let frenzyMultiplier = temp.player.frenzy.multiplier;

      config = {
        "LargeImage": "moneysim-rpc",
        "State": `${gameState}`,
        "Details": `$${intToString(money)} earned ($${intToString(multiplier + frenzyMultiplier)}/s)`,
      }  
      client.request('SET_ACTIVITY', {
        pid: process.pid,
        activity: {
            state: config.State,
            details: config.Details,
            timestamps: {
              start: start,
            },
            assets: {
              large_image: config.LargeImage,
            },
        }
      })
    }, 2000);
  })
}