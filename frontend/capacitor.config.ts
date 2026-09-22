import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.vercel.yatraaflow',
  appName: 'YatraFlow',
  webDir: 'public',
  server: {
    url: 'https://yatraaflow.vercel.app',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
