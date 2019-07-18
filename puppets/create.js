const puppeteer = require("puppeteer");

module.exports = async function(user) {
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    const page = await browser.newPage();

    await doLogin(page, process.env.OREILLY_USERNAME, process.env.OREILLY_PASSWORD);
    await doAddUser(page, user.givenName, user.familyName, user.email);

    await browser.close();
    return true;
  } catch (err) {
    return false;
  }
};

async function doLogin(page, adminEmail, adminPassword) {
  await page.goto('https://safaribooksonline.com/accounts/login/');
  // Fill in username https://github.com/GoogleChrome/puppeteer/issues/441
  //<input class="src-Input-input-field gridFullWidth--1yKPt" name="email" placeholder="Email Address or Username" value="">
  await page.focus('input[name=email]');
  await page.keyboard.type(adminEmail);
  // Fill in password
  await page.focus('input[name=password]');
  await page.keyboard.type(adminPassword);
  // Click
  await page.click('button[type=button]');
  // <button class="src-Button-button src-Button-primary src-Button-medium gridFullWidth--1yKPt" type="button">Sign In</button>
  await page.waitForNavigation();
}

async function doAddUser(page, firstName, lastName, emailAddress) {
  // Go to users page
  await page.goto('https://learning.oreilly.com/manage/users');

  // Wait until we can add a user. The first name field is fine.
  await page.waitForSelector('input[name=first_name]');

  await page.focus('input[name=first_name]');
  await page.keyboard.type(firstName);
  await page.focus('input[name=last_name]');
  await page.keyboard.type(lastName);
  await page.focus('input[name=email]');
  await page.keyboard.type(emailAddress);

  // Click "Add"
  await page.click('button.add-button');

  // Run away
}
