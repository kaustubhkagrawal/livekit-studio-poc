import { IConferenceProvider } from '../conference/providers/provider.types';

export interface IPlugin {
  name: string;

  registerListeners: (provider: IConferenceProvider) => void;
}
