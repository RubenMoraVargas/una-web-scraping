const puppeteer = require('puppeteer');
const urls = ['www.una.ac.cr', 'www.srb.una.ac.cr/index.php/es/', 'www.sarapiqui.una.ac.cr/', 'www.chorotega.una.ac.cr/', 'www.ucr.ac.cr', 'www.utc.ac.cr', 'www.uned.ac.cr'];

(async () => {
  const browser = await puppeteer.launch({
    args: ['--ignore-certificate-errors', '--ignore-certificate-errors-spki-list'],
  });
  const page = await browser.newPage();
  const currentTime = Date.now();

  for (const url of urls) {
    await page.goto('https://' + url, {
      waitUntil: 'load'
    });
    page.setViewport({
      width: 1920,
      height: 1080,
      isMobile: false
    }); 
    const cleanName = url.split('/').join('-');
    await page.screenshot({ path: `imagenes/${currentTime}-${cleanName}.png`, fullPage: true });
  }
  await browser.close();
})();
