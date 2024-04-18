type Setting = { name: string; value: any };

class AppSettings {
  private settings: Setting | null = null;

  setSettings(data: Setting): void {
    this.settings = data;
  }

  listSettings(): Setting | null {
    return this.settings;
  }

  getSettings(name: string): any {
    if (!name || !this.settings) {
      throw new Error('Name is not provided or settings are not set');
    }

    const settingName = name.toUpperCase();
    return this.settings[settingName];
  }
}

export default new AppSettings();
