import { Builder, By, Key, until } from "selenium-webdriver"

async function runSeleniumScript() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.google.com');
        await driver.findElement(By.name('q')).sendKeys('Headspin', Key.RETURN);
        await driver.wait(until.elementLocated(By.partialLinkText('www.headspin.io')), 5000);
        const headspinLink = await driver.findElement(By.partialLinkText('www.headspin.io'));
        await headspinLink.click();

        // Click Resources
        await driver.wait(until.elementLocated(By.linkText('Resources')), 5000);
        const resourcesLink = await driver.findElement(By.linkText('Resources'));
        await resourcesLink.click();
        await driver.sleep(2000)
        
        // Click Blog
        const blogLink = await driver.findElement(By.css('a[href="/blog"]'));
        await driver.executeScript("arguments[0].click();", blogLink);

        // await driver.wait(until.stalenessOf(driver.findElement(By.css('.nav-overlay'))), 5000);
        // const blogLink = await driver.findElement(By.css('a[href="/blog"]'));
        // await blogLink.click();
        // await driver.wait(until.elementLocated(By.partialLinkText('Blogs')), 5000);
        // const blogLink = await driver.findElement(By.partialLinkText('Blogs'));
        // await driver.sleep(2000)
        // await blogLink.click();

        // Select category Appium
        const dropdown = await driver.findElement(By.css('.dropdown-trigger')); // Replace with the actual dropdown ID
        await dropdown.click()
        await driver.sleep(2000)
        const appiumCategory = await driver.findElement(By.linkText('Appium'));
        await appiumCategory.click();

        // Search for "Simulating SMS Messages on Android"
        await driver.findElement(By.id('Custom-Search-2')).sendKeys('Simulating SMS Messages on Android', Key.RETURN);
        await driver.sleep(2000)

        // Verify no blogs are present
        const blogResultsWithFilter = await driver.findElements(By.className('w-dyn-item'));
        let blogFoundWithFilter = false;
        for (const result of blogResultsWithFilter) {
            const resultText = await result.getText();
            if (resultText.includes('Simulating SMS Messages on Android')) {
                blogFoundWithFilter = true;
                break;
            }
        }
        if (blogFoundWithFilter) {
            console.log('blog is present');
        } else {
            console.log('blog not present');
        }

        // Click All Blogs button
        const allBlogsButton = await driver.findElement(By.linkText('All Blogs'));
        await allBlogsButton.click();
        await driver.sleep(2000)

        // Search again for "Simulating SMS Messages on Android"
        await driver.findElement(By.id('Custom-Search')).sendKeys('Simulating SMS Messages on Android', Key.RETURN);
        await driver.sleep(2000)

        // Verify the blog is present
        const blogResults = await driver.findElements(By.className('w-dyn-item'));
        let blogFoundWithoutFilter = false;
        for (const result of blogResults) {
            const resultText = await result.getText();
            if (resultText.includes('Simulating SMS Messages on Android')) {
                blogFoundWithoutFilter = true;
                break;
            }
        }
        if (blogFoundWithoutFilter) {
            console.log('blog is present');
        } else {
            console.log('blog not present');
        }
    } catch (error) {
        console.log(error);

    } finally {
        await driver.quit();
    }
}

runSeleniumScript();

