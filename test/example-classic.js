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
        const configuration = new Configuration();

        // You can get your api key from the Applitools dashboard
        //configuration.setApiKey('APPLITOOLS_API_KEY')

        // Set new batch
        configuration.setBatch(new BatchInfo('Demo batch'))

        // Set the configuration to eyes
        eyes.setConfiguration(configuration);
    });


    it('Classic Runner Test', async () => {

        // Start the test by setting AUT's name, test name and viewport size (width X height)
        await eyes.open(browser, 'Hello World', 'Test', new RectangleSize(800, 600));

        // Navigate the browser to the "ACME" demo app.
        await browser.url('https://applitools.com/helloworld');

        await eyes.check('App Window', Target.window().fully());

        // End the test
        await eyes.closeAsync();
    });

    afterEach(async () => {
        // Close the browser
        await browser.deleteSession();

        // If the test was aborted before eyes.close was called, ends the test as aborted.
        await eyes.abortIfNotClosed();

        // Wait and collect all test results
        const results = await eyes.getRunner().getAllTestResults(false);
        console.log(results);
        console.log(results.getAllResults());
    });

});
