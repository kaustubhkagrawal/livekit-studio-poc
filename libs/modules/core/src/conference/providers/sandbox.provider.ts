import { IConferenceProvider } from './provider.interface';

interface SandboxProviderOptions {}

export class SandboxProvider implements IConferenceProvider {
  private options: SandboxProviderOptions = {};
  constructor(options: SandboxProviderOptions) {
    this.options = options;
  }

  init() {}

  async connect() {}
}
