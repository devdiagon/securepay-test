require('dotenv').config();
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.ENVIRONMENT,
  release: process.env.SENTRY_RELEASE,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  sendDefaultPii: false,
  enabled: Boolean(process.env.SENTRY_DSN),
  integrations: [
    Sentry.httpIntegration(),
    Sentry.expressIntegration(),
  ],
});
