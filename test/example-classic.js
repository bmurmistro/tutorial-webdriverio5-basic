'use strict';

const {remote} = require('webdriverio');
const {
    ClassicRunner,
    Eyes,
    Target,
    Configuration,
    RectangleSize,
    BatchInfo
} = require('@applitools/eyes-webdriverio');


let browser;
let eyes;

describe('wdio5', function () {


    beforeEach(async () => {
        // Use chrome browser
        const chrome = {
            capabilities: {
                browserName: 'chrome'
            },
            logLevel: 'silent',
        };
        // Use Chrome browser
        browser = await remote(chrome);

        // Initialize the Runner for your test.
        const runner = new ClassicRunner();

        // Initialize the eyes SDK
        eyes = new Eyes(runner);

        // Initialize the eyes configuration
        const configuration = eyes.getConfiguration();

        // You can get your api key from the Applitools dashboard
        configuration.setApiKey(process.env.APPLITOOLS_API_KEY)
        
        const batch = new BatchInfo("B");
        batch.setId("b6")
        // Set new batch
        configuration.setBatch(batch)
        // Set the configuration to eyes
        eyes.setConfiguration(configuration);
    });


    it('Classic Runner Test', async () => {

        // Start the test by setting AUT's name, test name and viewport size (width X height)
        await eyes.open(browser, 'Hello World', 'Test', new RectangleSize(800, 600));

        // Navigate the browser to the "ACME" demo app.
        await browser.url('https://applitools.com/helloworld');

        await eyes.check('App Window', 'Test1', Target.window().fully());

        // End the test
        await eyes.closeAsync();
        // Close the browser
        await browser.deleteSession();
        // Wait and collect all test results
        const results = await eyes.getRunner().getAllTestResults(true);
        console.log(results);

    });
    it('Classic Runner Test2', async () => {

        // Start the test by setting AUT's name, test name and viewport size (width X height)
        await eyes.open(browser, 'Hello World', 'Test3', new RectangleSize(800, 600));

        // Navigate the browser to the "ACME" demo app.
        await browser.url('https://applitools.com/helloworld2');

        await eyes.check('App Window', 'Test2', Target.window().fully());

        // End the test
        await eyes.closeAsync();
        // Close the browser
        await browser.deleteSession();
        // Wait and collect all test results
        const results = await eyes.getRunner().getAllTestResults(true);
        console.log(results);

    });

    afterEach(async () => {

        // If the test was aborted before eyes.close was called, ends the test as aborted.
        await eyes.abortIfNotClosed();
    });

});
