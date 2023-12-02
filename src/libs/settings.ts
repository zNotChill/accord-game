
export interface SettingsInterface {
  name: string
  description?: string
  enabled: boolean
  onEnable?: Function
  onDisable?: Function
}

export default class Settings implements SettingsInterface {
  name: string
  description?: string
  enabled: boolean
  onEnable?: Function
  onDisable?: Function

  constructor(name: string, description: string, enabled: boolean, onEnable?: Function, onDisable?: Function) {
    this.name = name;
    this.description = description;
    this.enabled = enabled;
    this.onEnable = onEnable || (() => {});
    this.onDisable = onDisable || (() => {});
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getEnabled() {
    return this.enabled;
  }

  enable() {
    this.enabled = true;
    if (this.onEnable !== undefined) {
      this.onEnable();
    }
  }

  disable() {
    this.enabled = false;
    if (this.onDisable !== undefined) {
      this.onDisable();
    }
  }
}

export const settings: SettingsInterface[] = [
  new Settings('Discord Rich Presence', 'Allows people to see what you are playing on Discord.', true),
  
];