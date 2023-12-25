export interface IConferenceProvider {
  init(): void;

  connect(): Promise<void>;
}
