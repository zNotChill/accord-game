
import path from "path";
import fs from "fs";
import Player from "./player";
import chalk from "chalk";

const basePath = 
  process.env.APPDATA ||
  (process.platform === "darwin"
    ? "~/Library/Preferences"
    : "~/accord-game");

const appDataDir = path.join(basePath, "accord");
const cacheDir = path.join(appDataDir, "cache");

let data = new Player().getJSON();

export function updateData() {
  try {
    if (!fs.existsSync(appDataDir)) fs.mkdirSync(appDataDir);
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);
    if (!fs.existsSync(path.join(cacheDir, "data.json"))) fs.writeFileSync(path.join(cacheDir, "data.json"), "{}");

    fs.writeFileSync(path.join(cacheDir, "data.json"), JSON.stringify(data));
    console.log(`${chalk.green("[DATA]")} Updated data.json`);
  } catch (error) {
    console.log(`${chalk.red("[DATA]")} Failed to update data.json`);
    console.log(error);
  }
  
}

export function getData() {
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
  if (!fs.existsSync(path.join(cacheDir, "data.json"))) fs.writeFileSync(path.join(cacheDir, "data.json"), "{}");
  if (fs.readFileSync(path.join(cacheDir, "data.json"), "utf-8") === "") fs.writeFileSync(path.join(cacheDir, "data.json"), "{}");

  const changed = compareSavedData(data);
  
  if (changed) {
    updateData();
  }

  return JSON.parse(fs.readFileSync(path.join(cacheDir, "data.json"), "utf-8"));
}

export function setData(newData: Player) {
  data = newData.getJSON();
  updateData();
}

export function setValues(newData: Partial<Player>) {
  data = { ...data, ...newData };
  updateData();
}

export function compareSavedData(data: any) {
  const savedData = data;
  const newData = new Player().getJSON() as any;

  // return the new data merged with the saved data

  const keys = Object.keys(savedData);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (newData[key] === undefined) {
      newData[key] = savedData[key];
    }
  }

  return newData !== savedData;
}

export function clearData() {
  data = new Player().getJSON();
  updateData();
}
