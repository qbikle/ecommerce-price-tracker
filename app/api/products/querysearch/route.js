import { NextRequest, NextResponse } from "next/server";
const axios = require("axios");
const cheerio = require("cheerio");
const https = require("https");
const puppeteer = require("puppeteer");

const checkBrightDataProxy = async () => {
  try {
    const testUrl = "http://lumtest.com/myip.json";

    const response = await axios.get(testUrl, {
      proxy: {
        host: "brd.superproxy.io",
        port: 22225,
        auth: "brd-customer-hl_7e0ff1f1-zone-price:lkxxotsy5liq",
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    console.log("Proxy check successful. Response:", response.data);
    return true;
  } catch (error) {
    console.error("Error checking Bright Data proxy:", error.message);
    return false;
  }
};

const searchAmazon = async (query) => {
  const brightDataProxyAgent = new https.Agent({
    rejectUnauthorized: false,
    proxy: {
      protocol: "http:",
      host: "brd.superproxy.io",
      port: 22225,
      auth: "brd-customer-hl_7e0ff1f1-zone-price:lkxxotsy5liq",
    },
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    const searchUrl = `https://www.amazon.in/s?k=${query}`;
    await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

    console.log("Searching Amazon");

    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);

    const productDetails = [];
    $(".s-main-slot .s-result-item").each((index, element) => {
      const title = $(element).find(".a-size-medium").text().trim();
      const price = $(element).find(".a-price-whole").text().trim();
      const imageUrl = $(element).find(".s-image").attr("src");
      const url = `https://www.amazon.in${$(element)
        .find(".a-link-normal")
        .attr("href")}`;

      if (price) {
        productDetails.push({ title, price, imageUrl, url });
      }
    });

    return productDetails;
  } finally {
    await browser.close();
  }
};

const searchFlipkart = async (query) => {
  const brightDataProxyAgent = new https.Agent({
    rejectUnauthorized: false,
    proxy: {
      protocol: "http:",
      host: "brd.superproxy.io",
      port: 22225,
      auth: "brd-customer-hl_7e0ff1f1-zone-price:lkxxotsy5liq",
    },
  });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    const searchUrl = `https://www.flipkart.com/search?q=${query}`;
    await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

    console.log("Searching Flipkart");

    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);

    const productDetails = [];
    $("._1fQZEK").each((index, element) => {
      const title = $(element).find("._4rR01T").text().trim();
      const price = $(element).find("._30jeq3").text().trim();
      const imageUrl = $(element).find("._396cs4").attr("src");
      const url = `https://www.flipkart.com${$(element)
        .find("._1fQZEK")
        .attr("href")}`;

      // Check if all required fields are present
      if (title && price && imageUrl && url) {
        productDetails.push({ title, price, imageUrl, url });
      }
    });

    return productDetails;
  } finally {
    await browser.close();
  }
};

export async function POST(req) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Query not provided" });
    }
    // Check Bright Data proxy
    // const proxyCheckResult = await checkBrightDataProxy();
    // if (!proxyCheckResult) {
    //   console.error("Bright Data proxy check failed. Aborting.");
    //   const response = NextResponse.json({
    //     error: "Bright Data proxy check failed",
    //   });
    //   return response;
    // }
    // const amazonProducts = await searchAmazon(query);
    // const flipkartProducts = await searchFlipkart(query);

    const [amazonProducts, flipkartProducts] = await Promise.all([
      searchAmazon(query),
      searchFlipkart(query),
    ]);

    return NextResponse.json({ amazonProducts, flipkartProducts });
  } catch (err) {
    console.error("Error during scraping:", err.message);
    return NextResponse.json({ error: err.message });
  }
}
