import { getData, setValues } from "./data"

export interface ShopInterface {
  name: string,
  description?: string,
  price: number,
  maxAmount: number,
  onBuy?: Function,
  onSell?: Function,
  amountBought?: number,
}

export default class Shop implements ShopInterface {
  name: string
  description?: string
  price: number
  maxAmount: number
  onBuy?: Function
  onSell?: Function
  amountBought?: number

  constructor(name: string, description: string, price: number, maxAmount: number, onBuy?: Function, onSell?: Function) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.maxAmount = maxAmount;
    this.onBuy = onBuy || (() => {});
    this.onSell = onSell || (() => {});
    this.amountBought = 0;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getPrice() {
    return this.price;
  }

  getMaxAmount() {
    return this.maxAmount;
  }

  getAmountBought() {
    return this.amountBought;
  }

  buy(amount: number) {
    if (this.amountBought !== undefined && this.maxAmount !== undefined) {
      if (this.amountBought + amount <= this.maxAmount) {
        this.amountBought += amount;
        if (this.onBuy !== undefined) {
          this.onBuy(amount);
        }
      }
    }
  }

  sell(amount: number) {
    if (this.amountBought !== undefined) {
      this.amountBought -= amount;
      if (this.onSell !== undefined) {
        this.onSell(amount);
      }
    }
  }

  getJSON() {
    return {
      name: this.name,
      price: this.price,
      maxAmount: this.maxAmount,
      amountBought: this.amountBought,
    }
  }
}

export const shops: ShopInterface[] = [
  new Shop("Accelerator", "Make the idle income faster", 150, 24, (amount: number) => {
    setValues(
      {
        coins: getData().coins - (150 * amount),
      }
    );
  }),
  new Shop("Computer", "Adds 1.5x to money multiplier, enables idle income, adds 1 to intelligence" , 100, 0, (amount: number) => {
    setValues(
      {
        coins: getData().coins - (100 * amount),
        intelligence: getData().intelligence + (1 * amount),
        coinMultiplier: getData().coinMultiplier + (1.5 * amount),
      }
    );
  }),
  new Shop("Book", "Adds 4x to money multiplier and adds 1 to intelligence", 250, 0, (amount: number) => {
    setValues(
      {
        coins: getData().coins - (250 * amount),
        intelligence: getData().intelligence + (1 * amount),
        coinMultiplier: getData().coinMultiplier + (4 * amount),
      }
    );
  }),
  new Shop("Bookshelf", "Adds 15x to money multiplier and adds 1 to intelligence", 5000, 0, (amount: number) => {
    setValues(
      {
        coins: getData().coins - (5000 * amount),
        intelligence: getData().intelligence + (1 * amount),
        coinMultiplier: getData().coinMultiplier + (15 * amount),
      }
    );
  }),
  new Shop("Library", "Adds 50x to money multiplier and adds 1 to intelligence", 100000, 0, (amount: number) => {
    setValues(
      {
        coins: getData().coins - (100000 * amount),
        intelligence: getData().intelligence + (1 * amount),
        coinMultiplier: getData().coinMultiplier + (50 * amount),
      }
    );
  }),
  new Shop("School", "Adds 200x to money multiplier and adds 1 to intelligence", 500000, 0, (amount: number) => {
    setValues(
      {
        coins: getData().coins - (500000 * amount),
        intelligence: getData().intelligence + (1 * amount),
        coinMultiplier: getData().coinMultiplier + (200 * amount),
      }
    );
  }),
  new Shop("College", "Adds 1000x to money multiplier and adds 1 to intelligence", 1000000, 0, (amount: number) => {
    setValues(
      {
        coins: getData().coins - (1000000 * amount),
        intelligence: getData().intelligence + (1 * amount),
        coinMultiplier: getData().coinMultiplier + (1000 * amount),
      }
    );
  }),
  new Shop("University", "Adds 5000x to money multiplier and adds 1 to intelligence", 5000000, 0, (amount: number) => {
    setValues(
      {
        coins: getData().coins - (5000000 * amount),
        intelligence: getData().intelligence + (1 * amount),
        coinMultiplier: getData().coinMultiplier + (5000 * amount),
      }
    );
  }),
  new Shop("Bank", "Adds 10000x to money multiplier and adds 1 to intelligence", 10000000, 0, (amount: number) => {
    setValues(
      {
        coins: getData().coins - (10000000 * amount),
        intelligence: getData().intelligence + (1 * amount),
        coinMultiplier: getData().coinMultiplier + (10000 * amount),
      }
    );
  }),
]