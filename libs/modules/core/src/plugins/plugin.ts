import { IConferenceProvider } from '../conference/providers/provider.types';

export interface IPlugin {
  name: string;

  register(provider: IConferenceProvider): void;
}
