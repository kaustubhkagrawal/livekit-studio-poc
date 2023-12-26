import { corePlugins } from '../plugins';
import { IConferenceProvider } from './providers/provider.types';
import { SandboxProvider } from './providers/sandbox.provider';

export class ConferenceSDK {
  private static providerInstance: IConferenceProvider | null = null;
  private constructor() {}

  public static registerProvider(provider: IConferenceProvider) {
    if (this.providerInstance === null) {
      this.providerInstance = provider;
      provider.init();
    } else {
      console.warn(
        'You are trying to register a provider multiple times. This action is being ignored as provider is already registered'
      );
    }
  }

  public static get provider(): IConferenceProvider {
    if (this.providerInstance === null) {
      this.providerInstance = new SandboxProvider({});
    }

    return this.providerInstance;
  }

  public static registerCorePlugins() {
    Object.keys(corePlugins).forEach((pluginName) => {
      corePlugins[pluginName].registerListeners(this.provider);
    });
  }

  static destroy() {
    this.provider.leave();
  }
}
