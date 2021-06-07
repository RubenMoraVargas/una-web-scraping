const puppeteer = require('puppeteer');

const run = async () => {
  const urlPagina = 'https://www.xataka.com'; 
  const browser = await puppeteer.launch({
    headless: false, 
    defaultViewport: null,
    args: ['--ignore-certificate-errors', '--ignore-certificate-errors-spki-list'],
  });
  var [page] = await browser.pages();

  await page.goto(urlPagina , {
    waitUntil: 'load',
    timeout: 0,
  });
  page.setViewport({
    width: 1920,
    height: 1080,
    isMobile: false,
  });

  const urls = await page.evaluate(() => Array.from(document.querySelectorAll('div.abstract-content > header > h2 > a')).map((anchor) => ({ enlace: anchor.href, descripcion: anchor.textContent })));

  for (const url of urls) { 
      const newTab = await browser.newPage();
      newTab.goto(url.enlace, {
        timeout: 0,
      });
    
  }
};
run();
