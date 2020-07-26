import { activeCell, getStoryPage, startBrowser } from './helper-fn';

describe('Keyboard Navigation', () => {
  let page;
  let browser;
  const waitFnOptions = { timeout: 500 };

  beforeAll(async () => {
    browser = await startBrowser();
  });

  beforeEach(async () => {
    page = await getStoryPage(browser, '/story/x-grid-tests-columns--small-col-sizes', true);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.waitFor(100);
  });

  afterEach(async () => {
    await page.close();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('CTRL Home / End navigation ', async () => {
    await page.keyboard.down('Control');
    await page.waitFor(100);
    await page.keyboard.press('End');
    await page.waitForFunction(activeCell, waitFnOptions, 99, 19);

    await page.keyboard.press('Home');
    await page.waitFor(100);
    await page.keyboard.up('Control');
    await page.waitForFunction(activeCell, waitFnOptions, 0, 0);
  });

  test('CTRL A to select all rows', async () => {
    await page.keyboard.down('Control');
    await page.waitFor(100);
    await page.keyboard.press('a');
    await page.waitFor(100);
    const imageEnd = await page.screenshot();
    expect(imageEnd).toMatchImageSnapshot();
  });

  test('Shift space + arrows to select rows ', async () => {
    await page.keyboard.down('Shift');
    await page.waitFor(100);
    await page.keyboard.press('Space');
    await page.waitFor(100);
    const imageEnd = await page.screenshot();
    expect(imageEnd).toMatchImageSnapshot();

    await page.keyboard.press('ArrowDown');
    await page.waitFor(100);
    await page.keyboard.press('ArrowDown');
    await page.waitFor(100);
    const selectedScreen = await page.screenshot();

    expect(selectedScreen).toMatchImageSnapshot();
  });

  test('Next/Previous page', async () => {
    await page.keyboard.press('Space');
    await page.waitForFunction(activeCell, waitFnOptions, 15, 0);

    await page.keyboard.press('PageDown');
    await page.waitForFunction(activeCell, waitFnOptions, 30, 0);

    await page.keyboard.press('PageUp');
    await page.waitForFunction(activeCell, waitFnOptions, 15, 0);
  });

  test('Copy to clipboard', async () => {
    await page.keyboard.down('Shift');
    await page.waitFor(100);
    await page.keyboard.press('Space');
    await page.waitFor(100);
    await page.keyboard.down('Control');
    await page.waitFor(100);
    await page.keyboard.press('c');

    expect(await page.evaluate(() => navigator.clipboard.readText())).toEqual(
      '0\n' +
        'USDGBP\n' +
        '0, 1\n' +
        '0, 2\n' +
        '0, 3\n' +
        '0, 4\n' +
        '0, 5\n' +
        '0, 6\n' +
        '0, 7\n' +
        '0, 8\n' +
        '0, 9\n' +
        '0, 10\n' +
        '0, 11\n' +
        '0, 12\n' +
        '0, 13\n' +
        '0, 14\n' +
        '0, 15\n' +
        '0, 16\n' +
        '0, 17\n' +
        '0, 18\n',
    );
  });
});
