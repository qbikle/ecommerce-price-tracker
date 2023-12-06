const express = require('express');
const app = express();
const cheerio = require('cheerio');
const axios = require('axios');

const mongoose = require('./db/mongoose');
const cors = require('cors');

app.use(cors());

const authRoute = require('./routes/authRoute');
app.use(express.json());
app.use('/auth', authRoute);

app.listen(3000, () => {
    console.log('server is listening on port 3000');
});



// app.get('/fetchData', async (req, res) => {
//     try {
//         const apiUrl = 'https://www.amazon.in/your-product-url'; // Replace with the actual URL
//         const response = await axios.get(apiUrl);
//         const htmlData = response.data;
//         const $ = cheerio.load(htmlData);

//         // Use the appropriate selector to target the price span
//         const priceSpan = $('#corePrice_feature_div .a-price .a-offscreen');

//         // Extract the text content of the price span
//         const priceText = priceSpan.text();

//         res.json({ priceText });
//     } catch (error) {
//         console.error('Error fetching and extracting data:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });