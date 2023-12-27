export enum CONFERENCE_EVENTS {
  CONFERENCE_INIT = 'core.conference.init',
  CONFERENCE_JOIN = 'core.conference.join.trigger',
  CONFERENCE_JOIN_SUCCESS = 'core.conference.join.success',
  CONFERENCE_LEAVE = 'core.conference.leave.trigger',
  CONFERENCE_LEAVE_SUCCESS = 'core.conference.leave.success',
  CONFERENCE_CONTEXT_UPDATE = 'core.conference.data.update',
  // ROOM
  ROOM = 'core.room',
  ROOM_CONNECT = 'core.room.connect.trigger',
  ROOM_CONNECT_SUCCESS = 'core.room.connect.success',
  ROOM_CONNECTION_STATE_UPDATE = 'core.room.connection.change',
  ROOM_LEAVE = 'core.room.leave.trigger',
  ROOM_LEAVE_SUCCESS = 'core.room.leave.success',
  // PARTICIPANT
  PARTICIPANT = 'core.participant',
  PARTICIPANT_CONNECTED = 'core.participant.connected',
  PARTICIPANT_DISCONNECTED = 'core.participant.disconnected',
  PARTICIPANT_UPDATED = 'core.participant.updated',
  PARTICIPANTS_REFRESH_LIST = 'core.participants.list.refresh',
  // REMOTE_TRACKS
  TRACK = 'core.track',
  TRACK_SUBSCRIBED = 'core.track.subscribed', // remote tracks
  TRACK_UNSUBSCRIBED = 'core.track.unsubscribed', // remote tracks
  TRACK_PUBLISHED = 'core.track.published', // local tracks
  TRACK_UNPUBLISHED = 'core.track.unpublished', // local tracks
  TRACK_MUTED = 'core.track.muted', // local + remote tracks
  TRACK_UNMUTED = 'core.track.unmuted', // local + remote tracks
  // AUDIO
  AUDIO = 'core.audio',
  AUDIO_TOGGLE = 'core.audio.toggle.trigger',
  AUDIO_TOGGLE_SUCCESS = 'core.audio.toggle.success',
  // VIDEO
  VIDEO = 'core.video',
  VIDEO_TOGGLE = 'core.video.toggle.trigger',
  VIDEO_TOGGLE_SUCCESS = 'core.video.toggle.success',
  // CLEANUP
  CLEANUP = 'core.cleanup',
}

export enum SANDBOX_EVENTS {
  PARTICIPANTS_CREATED = 'sandbox.participants.created',
}
