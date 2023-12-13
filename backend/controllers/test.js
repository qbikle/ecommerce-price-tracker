#!/usr/bin/env node
const axios = require('axios');
const cheerio = require('cheerio');

const username = 'brd-customer-hl_7e0ff1f1-zone-unblocker';
const password = '413b79wvk0zr';
const port = 22225;
const session_id = (1000000 * Math.random()) | 0;

const extractAmazonDetails = async (htmlData) => {
    try {
      const $ = cheerio.load(htmlData);
  
      const price = $('#corePriceDisplay_desktop_feature_div .a-section .priceToPay .a-offscreen').text().trim();
      const mrp = $('#corePriceDisplay_desktop_feature_div .a-spacing-small .a-price .a-offscreen').text().trim();
      const imageUrl = $('#imgTagWrapperId #landingImage').attr('src');
      const title = $('#productTitle').text().trim();
  
      return { price, mrp, imageUrl, title };
    } catch (error) {
      console.error('Error extracting Amazon details:', error.message);
      throw error;
    }
  };
  
  

const getProduct = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required in the request body' });
    }

    const options = {
      auth: {
        username: `${username}-session-${session_id}`,
        password: `${password}`
      },
      host: 'brd.superproxy.io',
      port: port,
      rejectUnauthorized: false,
    };

    const response = await axios.get(url, options);
    const htmlData = response.data;

    if (url.includes('amazon')) {
      const { price, mrp, title } = await extractAmazonDetails(htmlData);
      console.log(price, mrp, title);
      // res.json({ price, mrp, title });
    } else if (url.includes('flipkart')) {
      const $ = cheerio.load(htmlData);
      const price = $('.a-price-whole').text();
      const title = $('#productTitle').text().trim();
      console.log(price, title);
      // res.json({ priceText });
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getProduct,
};
