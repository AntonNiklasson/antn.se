# antn.se

## Analytics

Cloudflare Web Analytics replaces Google Analytics. The public beacon token for
the existing antn.se registration is configured in src/components/Analytics.astro.
No analytics environment variables are required.

Analytics runs only in production builds. Cloudflare's built-in SPA tracking
handles Astro's client-side navigation. Automatic snippet injection is disabled
in Cloudflare to avoid loading the beacon twice.

Manage the registration with the authenticated Cloudflare CLI:

```sh
cf rum site-info list
cf rum site-info get 011a65f22510483389cd95bec9f82322
```

Documentation: https://developers.cloudflare.com/web-analytics/get-started/
