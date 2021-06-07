const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');

const urls = ['una.ac.cr', 'srb.una.ac.cr/index.php/es/', 'sarapiqui.una.ac.cr/', 'chorotega.una.ac.cr/', 'ucr.ac.cr', 'utc.ac.cr', 'uned.ac.cr'];

downloadAsPromise = (url, destination) =>
  new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https
      .get(url, (response) => {
        response.pipe(file);

        file.on('finish', () => {
          file.close(resolve(true));
        });
      })
      .on('error', (error) => {
        fs.unlink(destination);

        reject(error.message);
      });
  });

run = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: false,
    args: ['--ignore-certificate-errors', '--ignore-certificate-errors-spki-list'],
  });
  const page = await browser.newPage();
  page.setViewport({
    width: 1024,
    height: 768,
    isMobile: false,
  });
  for (const url of urls) {
    console.log(`Barriendo https://www.${url}`);
    await page.goto(`https://www.${url}`);
    const imagesSources = await page.$$eval('img', (imgs) => imgs.map((image) => image.getAttribute('src')));
    const cleanName = url.split('/').join('-');

    const currentTime = Date.now();

     const data = JSON.stringify({ origen: url, fecha: currentTime, imagenes: imagesSources }, null, 4);
 
      fs.writeFileSync(`./listas/${currentTime}-${cleanName}.json`, data);
  }

  await browser.close();
};

run();
