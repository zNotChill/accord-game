
// Copyright (c) zNotChill 2023. All rights reserved.

const rpc = require("discord-rpc");
const fs = require("fs");
const { shortFormat, intToString, formatNum } = require("./format");
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

    let format = data.split(" | ");

    let money = format[0];
    let multiplier = format[1];
    let idleIncomeSpeed = format[2];
    let gameState = format[3];
    let frenzyMultiplier = format[5];

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
  }, 1000);
})