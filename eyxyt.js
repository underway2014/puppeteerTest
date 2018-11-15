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
  page.viewport({
      width: 1920,
      height: 1080
  })

  await page.goto('https://tapi.eyxyt.com/mallfront/#/login');
  await page.screenshot({path: './eyxyt/login.png'});
  
  await page.tap('.button-login')
  await page.waitFor(1000);
  await page.screenshot({path: './eyxyt/login-error.png'});
  
  await page.type('.el-input__inner', '18602810828', {delay: 100})
  
  await page.type('.is-error .el-input__inner', `123456`, {delay: 100})
  await page.tap('.button-login')
  await page.waitFor(1000);
  await page.screenshot({path: './eyxyt/login-success.png'});
  
  
  let inputs = await page.$$('.el-row .el-input .el-input__inner');
  console.log('inputs[0] >> ', inputs.length)
  await inputs[0].type('65143')
  await page.waitFor(1000);
  await page.type('input[placeholder="请输入订单号"]', '5181')
  await page.waitFor(1000);
  
  let btns = await page.$$('.el-row .el-col-4 > button');
  console.log('btns >> ', btns.length)
  await btns[0].click();
  await page.waitFor(1000);
  await page.screenshot({path: './eyxyt/order-search.png'});
  
  await page.click('.el-row a')
  const ahtml = await page.$eval('.el-row a', e => e.outerHTML);
  console.log('ahtml >> ', ahtml)
  await page.waitFor(1000);
  
//   await browser.close();
})();