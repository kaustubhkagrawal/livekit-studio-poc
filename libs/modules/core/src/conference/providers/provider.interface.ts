export interface IConferenceProvider {
  init(): void;

  connect(token?: string): Promise<void>;

  leave(): Promise<void>;
}
