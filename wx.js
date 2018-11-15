const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
          width: 2920,
          height: 1080
      }
  });
  const page = await browser.newPage();
  page.setViewport({
      width: 1920,
      height: 1080
  })

  await page.goto('https://wx.qq.com/');
  console.log('goto end >>')
  await page.waitFor(20000);
  await page.screenshot({path: './wx/login.png'})

  console.log('login success');

  let info = await page.$eval('.header .info .display_name', e => e.outerHTML);
  let info1 = await page.$eval('.header .info .display_name', e => e.innerText);
  let info2 = await page.$eval('.header .info .display_name', e => e.innerHTML);

  console.log('info >> ', info, info1, info2)

  let readbtns = await page.$$('.tab .tab_item');
  console.log('readbtns >> ', readbtns.length)
  await readbtns[1].click();

  let items = await page.$$('.read_item');
  console.log('items >> ', items.length);

  for(let i = 0, len = items.length; i < len; i++) {
      let item = items[0];
      await item.click();
      await page.waitFor(1000);

      let title = await item.$('.title').innerText;
      let media = await page.$('.rich_media_meta').innerText
      console.log('title>> ', title, media);
  }






})();