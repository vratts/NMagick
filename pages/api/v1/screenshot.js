import chrome from 'chrome-aws-lambda';
import { join } from 'path';
import { createReadStream } from 'fs';

export default async (req, res) => {
    const { url } = req.query;

    try {
        const browser = await chrome.puppeteer.launch({
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });
        const screenshotPath = join(process.cwd(), 'public', 'screenshot.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await browser.close();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        createReadStream(screenshotPath).pipe(res);
    } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
};