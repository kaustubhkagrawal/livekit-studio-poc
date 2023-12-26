export interface Participant {
  sid: string;
  name?: string;
  identity: string;
  metadata?: string;
  isSpeaking: boolean;
  isAgent: boolean;
  isCameraEnabled: boolean;
  isLocal: boolean;
  isMicrophoneEnabled: boolean;
  isScreenShareEnabled: boolean;
  audioLevel: number;
}
