const axios = require("axios");
const { decryptAPIData } = require("./crypto");
const { usdToInr } = require("./currency");

const encryptedAPIKey = {
  iv: "869f0af7fb12fe62b818248b9bd79d34",
  content: "e09f5b10c4e95193ee1efd28fdc066a911f26e1345696baf218af24a3fbaecf1",
};

const cryptoCoins = ["ADA", "CHZ", "DOGE", "DNT"];

const getAPIUrl = () => {
  const BASE_API_URL = "http://api.coinlayer.com/api/live";
  const API_KEY = decryptAPIData(encryptedAPIKey);
  return `${BASE_API_URL}?access_key=${API_KEY}`;
};

const getStats = async () => {
  const API_URL = getAPIUrl();
  const response = await axios(API_URL);
  const cryptoData = response.data.rates;
  const dollarToInr = await usdToInr();
  console.log(dollarToInr);
  cryptoCoins.forEach((coin) => {
    if (cryptoData[coin]) {
      console.log(`Current ${coin} price is ${dollarToInr * cryptoData[coin]}`);
    }
  });
};

getStats();
