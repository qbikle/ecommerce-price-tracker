const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const extractAmazonDetails = async (html) => {
  try {
    const $ = cheerio.load(html);

    const price = $('#corePriceDisplay_desktop_feature_div .a-section .priceToPay .a-offscreen').text().trim();
    const mrp = $('#corePriceDisplay_desktop_feature_div .a-spacing-small .a-price .a-offscreen').text().trim();
    const imageUrl = $('#imgTagWrapperId img').attr('src');
    const title = $('#productTitle').text().trim();

    return { price, mrp, imageUrl, title };
  } catch (error) {
    console.error('Error extracting Amazon details:', error.message);
    throw error;
  }
};

const extractFlipkartDetails = async (html) => {
  try {
    const $ = cheerio.load(html);

    const price = $('.dyC4hf ._30jeq3').text().trim();
    const mrp = $('.dyC4hf ._3I9_wc').text().trim();
    const imageUrl = $('.CXW8mj img').attr('src');
    const title = $('.B_NuCI').text().trim();

    return { price, mrp, imageUrl, title };
  } catch (error) {
    console.error('Error extracting Flipkart details:', error.message);
    throw error;
  }
};

const checkBrightDataProxy = async () => {
  try {
    const testUrl = 'http://lumtest.com/myip.json';
    const brightDataProxyUrl = 'http://brd-customer-hl_7e0ff1f1-zone-price:lkxxotsy5liq@brd.superproxy.io:22225';

    const response = await axios.get(testUrl, {
      proxy: {
        host: 'brd.superproxy.io',
        port: 22225,
        auth: 'brd-customer-hl_7e0ff1f1-zone-price:lkxxotsy5liq',
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    console.log('Proxy check successful. Response:', response.data);
    return true;
  } catch (error) {
    console.error('Error checking Bright Data proxy:', error.message);
    return false;
  }
};

const getProduct = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required in the request body' });
    }

    console.log(url);

    // Check Bright Data proxy
    const proxyCheckResult = await checkBrightDataProxy();
    if (!proxyCheckResult) {
      console.error('Bright Data proxy check failed. Aborting.');
      res.status(500).json({ error: 'Bright Data proxy check failed' });
      return;
    }

    const brightDataProxyAgent = new https.Agent({
      rejectUnauthorized: false,
      proxy: {
        protocol: 'http:',
        host: 'brd.superproxy.io',
        port: 22225,
        auth: 'brd-customer-hl_7e0ff1f1-zone-price:lkxxotsy5liq',
      },
    });

    const html = await axios.get(url, {
      httpsAgent: brightDataProxyAgent,
    });

    if (url.includes('amazon')) {
      console.log('Extracting Amazon details...');
      const { price, mrp, title, imageUrl } = await extractAmazonDetails(html.data);
      console.log(price, mrp, title, imageUrl);
      res.json({ price, mrp, title, imageUrl });
    } else if (url.includes('flipkart')) {
      console.log('Extracting Flipkart details...');
      const { price, mrp, title, imageUrl } = await extractFlipkartDetails(html.data);
      console.log(price, mrp, title, imageUrl);
      res.json({ price, mrp, title, imageUrl });
    }
  } catch (err) {
    console.error('Error during scraping:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getProduct,
};
