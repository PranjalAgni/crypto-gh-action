const axios = require("axios");
const { decryptAPIData } = require("./crypto");
const { usdToInr } = require("./currency");

const encryptedAPIKey = "MjlmYTMyOWVlZDIyZjk1N2NhYjY4YWM3OGYyY2EzNGI=";

const cryptoCoins = ["ADA", "CHZ", "DOGE", "DNT"];

const getAPIUrl = () => {
  const BASE_API_URL = "http://api.coinlayer.com/api/live";
  const API_KEY = decryptAPIData(encryptedAPIKey);
  return `${BASE_API_URL}?access_key=${API_KEY}`;
};

const getStats = async () => {
  try {
    const API_URL = getAPIUrl();
    console.log(API_URL);
    const response = await axios(API_URL);
    const cryptoData = response.data.rates;
    console.log("Successfully fetched coins data");
    const dollarToInr = await usdToInr();
    console.log(dollarToInr);
    cryptoCoins.forEach((coin) => {
      if (cryptoData[coin]) {
        console.log(
          `Current ${coin} price is ${dollarToInr * cryptoData[coin]}`
        );
      }
    });
  } catch (error) {
    console.error(error.stack);
  }
};

getStats();
