import { IPlugin } from '../plugins';
import { defaultConfig } from './config';

const plugin: IPlugin<typeof defaultConfig> = {
  name: 'conference',
  config: defaultConfig,
  register(config) {},
  cleanup() {},
};

export default plugin;
