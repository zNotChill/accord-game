// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod player; // Import the player module

use std::fs;
use std::path::Path;
use std::io::Write;
use serde_json::json;
use serde::{Serialize, Deserialize};
use player::Player; // Import the Player struct from the player module

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    let base_path = std::env::var("APPDATA").unwrap_or_else(|_| {
        if cfg!(target_os = "macos") {
            "~/Library/Preferences".to_string()
        } else {
            "~/accord-game".to_string()
        }
    });

    let app_data_dir = Path::new(&base_path).join("accord");
    let cache_dir = app_data_dir.join("cache");

    let mut data = Player::new().get_json();

    update_data(&cache_dir, &mut data);
}

pub fn update_data(cache_dir: &Path, data: &mut String) {
    fs::create_dir_all(&cache_dir).unwrap();

    let data_path = cache_dir.join("data.json");
    if !data_path.exists() {
        fs::File::create(&data_path).unwrap().write_all(b"{}").unwrap();
    }

    fs::write(&data_path, data.clone()).unwrap();
    println!("[DATA] Updated data.json");
}

pub fn get_data(cache_dir: &Path) -> Player {
    fs::create_dir_all(&cache_dir).unwrap();

    let data_path = cache_dir.join("data.json");
    if !data_path.exists() {
        fs::File::create(&data_path).unwrap().write_all(b"{}").unwrap();
    }

    let saved_data: String = fs::read_to_string(&data_path).unwrap();
    if saved_data.is_empty() {
        fs::write(&data_path, "{}").unwrap();
    }

    let saved_data: Player = serde_json::from_str(&saved_data).unwrap();
    let new_data = Player::new().get_json();

    if saved_data.get_json() != new_data {
        update_data(&cache_dir, &mut new_data);
    }

    saved_data
}

pub fn set_data(cache_dir: &Path, new_data: Player) {
    let mut data = new_data.get_json();
    update_data(&cache_dir, &mut data);
}