import { IConferenceProvider } from './provider.interface';

interface SandboxProviderOptions {}

export class SandboxProvider implements IConferenceProvider {
  private options: SandboxProviderOptions = {};
  constructor(options: SandboxProviderOptions) {
    this.options = options;
  }

  init() {}

  async connect(token: string = '') {
    console.log('token used', token);
    console.log('Connection established');
  }

  private cleanup() {}

  async leave() {
    console.log('left conference');
    this.cleanup();
  }
}
