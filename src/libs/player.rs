use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Shop {
    // Define the Shop struct fields here
}

#[derive(Serialize, Deserialize)]
pub struct Player {
    pub name: String,
    pub coins: i32,
    pub coin_multiplier: Option<f32>,
    pub reputation: i32,
    pub personality: i32,
    pub intelligence: i32,
    pub potential: i32,
    pub rating: i32,
    pub shop: Option<Vec<Shop>>,
}

impl Player {
    pub fn new() -> Self {
        Self {
            name: "Player".to_string(),
            coins: 100,
            coin_multiplier: Some(1.0),
            reputation: 0,
            personality: 0,
            intelligence: 0,
            potential: 0,
            rating: 0, // This will be updated in the constructor
            shop: None, // This should be replaced with your actual shops
        }
    }
}