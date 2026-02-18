const axios = require('axios');
const cheerio = require('cheerio');


async function scrapeProduct(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return {
      title: $('title').text(),
      url
    };
  } catch (err) {
    return { error: err.message };
  }
}


module.exports = { scrapeProduct };
