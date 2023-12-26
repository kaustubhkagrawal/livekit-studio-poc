import { CONFERENCE_PROVIDER } from '../../../constants';
import * as livekit from './livekit';
import * as sandbox from './sandbox';

export default {
  [CONFERENCE_PROVIDER.LIVEKIT]: livekit,
  [CONFERENCE_PROVIDER.SANDBOX]: sandbox,
};
