export const envConfig = {
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
