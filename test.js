const { Builder, By, until, Key } = require('selenium-webdriver');
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
        var searchString = "Selenium";
        await driver.get("http://google.com");
        await driver.findElement(By.name("q")).sendKeys(searchString, Key.RETURN);
        var title = await driver.getTitle();
        await driver.wait(until.titleIs(title), 1000);
        let element = await driver.findElement(By.xpath('//div[@class="hlcw0c" or @class="g"][3]')).click(); 
    });

    after(async function() {
        driver && driver.quit()
    });
});