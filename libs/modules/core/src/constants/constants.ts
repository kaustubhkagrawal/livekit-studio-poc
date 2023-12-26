export enum CONFERENCE_STATES {
  IDLE = 'idle',
  INIT = 'init',
  ACTIVE = 'active',
  CONNECTING = 'connecting',
  WAITING = 'waiting',
  DISCONNECTED = 'disconnected',
}

export enum CONTEXT_UPDATE_TYPE {
  SET = 'set',
}

export enum CONFERENCE_PROVIDER {
  LIVEKIT = 'livekit',
  SANDBOX = 'sandbox',
}
