import { IConferenceProvider } from './provider.interface';

interface LivekitProviderOptions {}
export class LivekitProvider implements IConferenceProvider {
  private options: LivekitProviderOptions = {};

  constructor(options: LivekitProviderOptions) {
    this.options = options;
  }

  init() {}

  async connect() {}
}
