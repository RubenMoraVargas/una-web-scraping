const puppeteer = require('puppeteer');

(async () => {
  const loginUrl = 'http://localhost:4200/login';
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    defaultViewport: null,
    args: ['--ignore-certificate-errors', '--ignore-certificate-errors-spki-list'],
  });
  const currentTime = Date.now();

  const secretData = {
    username: 'correo@gmail.com',
    password: 'Una2021',
  };
  var [page] = await browser.pages();
  await page.goto(loginUrl, {
    waitUntil: 'networkidle0',
  });

  await page.click('#floatingInput');
  await page.keyboard.type(secretData.username);
  await page.click('#floatingPassword');
  await page.keyboard.type(secretData.password);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await page.click('body > app-root > div > app-login > div > main > div.row.m-4 > div:nth-child(2) > button');
 
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await page.emulateMediaType('print');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await page.screenshot({ path: `reporte-confidencial.png`, fullPage: true }); 
  console.log("Se ha obtenido el reporte");
  await browser.close();

})();
