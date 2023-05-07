var achievements = [
  {
    name: "Welcome to the world",
    description: "Start the game",
    id: 1,
    unlocked: false,
    unlockedAt: null,
    points: 5,
  },
  {
    name: "First Dollar",
    description: "Earn your first dollar",
    id: 2,
    unlocked: false,
    unlockedAt: null,
    points: 5,
    auto: true,
    money: 1,
  },
  {
    name: "First Hundred",
    description: "Earn your first hundred dollars",
    id: 3,
    unlocked: false,
    unlockedAt: null,
    points: 5,
    auto: true,
    money: 100,
  },
  {
    name: "First Thousand",
    description: "Earn your first thousand dollars",
    id: 4,
    unlocked: false,
    unlockedAt: null,
    points: 5,
    auto: true,
    money: 1000,
  },
  {
    name: "First Million",
    description: "Earn your first million dollars",
    id: 5,
    unlocked: false,
    unlockedAt: null,
    points: 5,
    auto: true,
    money: 1000000,
  },
  {
    name: "First Billion",
    description: "Earn your first billion dollars",
    id: 6,
    unlocked: false,
    unlockedAt: null,
    points: 5,
    auto: true,
    money: 1000000000,
  },
  {
    name: "First Trillion",
    description: "Earn your first trillion dollars",
    id: 7,
    unlocked: false,
    unlockedAt: null,
    points: 5,
    auto: true,
    money: 1000000000000,
  },
  {
    name: "First Quadrillion",
    description: "Earn your first quadrillion dollars",
    id: 8,
    unlocked: false,
    unlockedAt: null,
    points: 8,
    auto: true,
    money: 1000000000000000,
  },
  {
    name: "First Quintillion",
    description: "Earn your first quintillion dollars",
    id: 9,
    unlocked: false,
    unlockedAt: null,
    points: 10,
    auto: true,
    money: 1000000000000000000,

  },
  {
    name: "First Sextillion",
    description: "Earn your first sextillion dollars",
    id: 10,
    unlocked: false,
    unlockedAt: null,
    points: 15,
    auto: true,
    money: 1000000000000000000,
  },

  // shops

  {
    name: "First Shop Item",
    description: "Buy your first shop item",
    id: 11,
    unlocked: false,
    unlockedAt: null,
    points: 5,
    auto: true
  },
]

function getAchievementPoints() {
  let points = 0;
  temp.achievements.achievements.forEach((v) => {
    if(v.unlocked) {
      points += v.points;
    }
  });
  return points;
}

function checkForMoneyAchievements() {
  temp.achievements.achievements.forEach((v) => {
    if(v.auto) {
      if(temp.player.money >= v.money && !v.unlocked) {
        unlockAchievement(v.id);
      }
    }
  });
}

function userHasAchievement(id) {
  temp.achievements.achievements.forEach((v) => {
    if(id === v.id && v.unlocked) {
      return true;
    }
  })
}

function unlockAchievement(id) {
  temp.achievements.achievements.forEach((v) => {
    if(id === v.id && !v.unlocked) {
      v.unlocked = true;
      v.unlockedAt = new Date();
      bottomPopup(`Achievement unlocked: <strong class="accent">${getAchievement(id).name}</strong>!<br><small>${getAchievement(id).description}</small>`);
    }
  });
}

function getAchievement(id) {
  return achievements.find((v) => {
    return v.id === id;
  });
}