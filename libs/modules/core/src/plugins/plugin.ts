export interface IPluginConfig {
  enabled: boolean;
}

export interface IPlugin<T extends IPluginConfig> {
  name: string;
  config: T;
  register: (config: T) => void;
  cleanup: () => void;
}
