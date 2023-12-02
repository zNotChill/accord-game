import { ShopInterface, shops } from "./shop"

interface PlayerInterface {
  name: string
  coins: number
  coinMultiplier?: number
  reputation: number
  personality: number
  intelligence: number
  potential: number
  rating: number
  shop?: ShopInterface[]
}

export default class Player implements PlayerInterface {
  name: string
  coins: number
  coinMultiplier?: number
  reputation: number
  personality: number
  intelligence: number
  potential: number
  rating: number
  shop?: ShopInterface[]

  constructor() {
    this.name = 'Player';
    this.coins = 100;
    this.coinMultiplier = 1;
    this.reputation = 0;
    this.personality = 0;
    this.intelligence = 0;
    this.potential = 0;
    this.rating = this.getRating();
    this.shop = shops;
  }

  getRating() {
    return Math.round((this.reputation + this.personality + this.intelligence + this.potential) / 5);
  }

  getCoins() {
    return this.coins;
  }

  getCoinMultiplier() {
    return this.coinMultiplier;
  }

  getReputation() {
    return this.reputation;
  }

  getPersonality() {
    return this.personality;
  }

  getIntelligence() {
    return this.intelligence;
  }

  getPotential() {
    return this.potential;
  }

  getName() {
    return this.name;
  }

  getShop() {
    return this.shop;
  }

  getJSON() {
    return {
      name: this.name,
      coins: this.coins,
      coinMultiplier: this.coinMultiplier,
      reputation: this.reputation,
      personality: this.personality,
      intelligence: this.intelligence,
      potential: this.potential,
      rating: this.rating,
      shop: this.shop,
    };
  }

  setJSON(data: PlayerInterface) {
    this.name = data['name'];
    this.coins = data['coins'];
    this.coinMultiplier = data['coinMultiplier'];
    this.reputation = data['reputation'];
    this.personality = data['personality'];
    this.intelligence = data['intelligence'];
    this.potential = data['potential'];
    this.rating = data['rating'];
    this.shop = data['shop'];
  }
}