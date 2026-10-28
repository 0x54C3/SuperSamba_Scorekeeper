// Regenerates the README screenshots from the built-in example game.
//
//   cd tools
//   npm install
//   npx playwright install chromium   (first time only)
//   npm run screenshots
//
// Serves the repo from a local port so the page behaves as it does on GitHub
// Pages, then captures each tab at iPad and phone sizes in light and dark themes.
// Output goes to ../screenshots/. Nothing here is part of the app.

const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'screenshots');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.webmanifest': 'application/manifest+json', '.png': 'image/png' };

const IPAD = { width: 1180, height: 820 };
const PHONE = { width: 390, height: 844 };
const SHOTS = [
  { name: 'round-light',      viewport: IPAD,  scheme: 'light', tab: '0' },
  { name: 'summary-dark',     viewport: IPAD,  scheme: 'dark',  tab: 'summary' },
  { name: 'rules-light',      viewport: IPAD,  scheme: 'light', tab: 'rules' },
  { name: 'howto-dark',       viewport: IPAD,  scheme: 'dark',  tab: 'howto' },
  { name: 'games-light',      viewport: IPAD,  scheme: 'light', tab: 'games' },
  { name: 'phone-round-dark', viewport: PHONE, scheme: 'dark',  tab: '2', mobile: true },
];

function serve() {
  const srv = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/index.html';
    const file = path.normalize(path.join(ROOT, p));
    if (!file.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      res.end(data);
    });
  });
  return new Promise(resolve => srv.listen(0, '127.0.0.1', () => resolve(srv)));
}

(async () => {
  const srv = await serve();
  const url = `http://127.0.0.1:${srv.address().port}/`;
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  let failed = false;
  for (const s of SHOTS) {
    const ctx = await browser.newContext({
      viewport: s.viewport, deviceScaleFactor: 2, colorScheme: s.scheme,
      isMobile: !!s.mobile, hasTouch: !!s.mobile, serviceWorkers: 'block',
    });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForSelector('#tabs .tab');
    await page.click(`#tabs [data-act="tab"][data-v="${s.tab}"]`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(OUT, s.name + '.png') });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const ok = scrollWidth <= s.viewport.width;
    if (!ok) failed = true;
    console.log(`${ok ? 'ok  ' : 'WIDE'} ${s.name}.png  (${s.viewport.width}x${s.viewport.height} ${s.scheme}, page width ${scrollWidth})`);
    await ctx.close();
  }
  await browser.close();
  srv.close();
  if (failed) { console.error('Some pages scroll horizontally. Fix the layout before using these.'); process.exit(1); }
})().catch(err => { console.error(err); process.exit(1); });
