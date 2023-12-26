import { CONFERENCE_PROVIDER } from '../../../constants';
import livekit from './livekit';
import sandbox from './sandbox';

export default {
  [CONFERENCE_PROVIDER.LIVEKIT]: livekit,
  [CONFERENCE_PROVIDER.SANDBOX]: sandbox,
};
