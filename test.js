const { Builder, By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');
require("chromedriver");
var chrome = require('selenium-webdriver/chrome');

let TIMEOUT = 15000;

describe('Prueba que accede al tercer vínculo no patrocinado de una búsqueda en Google.', async function () {
    let driver;
    const options = new chrome.Options();

    before(async function() {
        driver = new Builder().forBrowser('chrome').
        setChromeOptions(options).build();
    });

    it('Se busca el término "Selenium".', async function() {
        this.timeout(TIMEOUT);
        await driver.get("http://google.com");
        await driver.findElement(By.name("q")).sendKeys("Selenium", Key.RETURN);
        result = await driver.findElement(By.xpath('//div[@class="hlcw0c" or @class="g"][3]'));
        full_text = await result.getText();
        expected_text = full_text.substring(full_text.indexOf("\n") + 1).slice(1, 21);
        await result.click();
        actual_title = await driver.getTitle();
        actual_text = actual_title.slice(0, 20);
        expect(actual_text).to.equal(expected_text);
    });

    after(async function() {
        driver && driver.quit()
    });
});