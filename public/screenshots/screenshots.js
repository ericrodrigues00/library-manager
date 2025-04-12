const puppeteer = require('puppeteer');

const baseUrl = 'http://localhost:3000';

const rotas = [
  'account-settings',
  'admin-dashboard',
  'backup-management',
  'borrow-books',
  'dashboard',
  'forgot-password',
  'library-management',
  'loan-history',
  'login',
  'material-details',
  'my-loans',
  'my-reservations',
  'notifications',
  'register',
  'reports',
  'return-books',
  'search'
];

(async () => {
  const browser = await puppeteer.launch();

  for (const rota of rotas) {
    const page = await browser.newPage();
    const url = `${baseUrl}/${rota}`;

    // Screenshot Desktop
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: `imgs/${rota}-desktop.png`, fullPage: true });
    console.log(`✅ Desktop - ${rota}`);

    // Screenshot Mobile
    await page.emulate(puppeteer.devices['iPhone X']);
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: `imgs/${rota}-mobile.png`, fullPage: true });
    console.log(`📱 Mobile - ${rota}`);

    await page.close();
  }

  await browser.close();
})();
