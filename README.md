# Crawl BiliBili video subtitles

### introduce

Only for BiliBili video subtitle crawling, and the exported subtitles are in 'SRT' format.

### instructions

1. No need to download dependent packages.
2. Copy the BiliBili video address, find the variable named REPLACE_URL in the app.js file, paste and save it.
3. Root startup project: `node ./app.js`

```javascript
// Replace the URL at this location in the code
const REPLACE_URL =
  "https://www.bilibili.com/video/BV1Pf4y177Vp?seid=15249322987164438078";
```
