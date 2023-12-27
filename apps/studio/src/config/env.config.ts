import { cleanTrailingSlash } from '@kaustubhkagrawal/shared';

export const envConfig = {
  apiUrl: cleanTrailingSlash(
    import.meta.env.VITE_APP_API_URL ?? window.location.href.split('?')[0],
    true
  ),
  conference: {
    livekit: {
      wsUrl:
        import.meta.env.VITE_APP_LIVEKIT_WS_URL ||
        'wss://testico-qpok6ilf.livekit.cloud',

      apiKey: import.meta.env.VITE_APP_LIVEKIT_API_KEY || 'APIhSjLb7LG5CkY',
      apiSecret: import.meta.env.VITE_APP_LIVEKIT_API_SECRET || '',
    },
  },
};
