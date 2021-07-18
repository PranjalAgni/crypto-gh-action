const axios = require("axios");
const { decryptAPIData } = require("./crypto");

const encryptedAPIKeyData = {
  iv: "869f0af7fb12fe62b818248b9bd79d34",
  content: "e09f5b10c4e95193ee1efd28fdc066a911f26e1345696baf218af24a3fbaecf1",
};

const getAPIUrl = () => {
  const BASE_API_URL = "http://api.coinlayer.com/api/live";
  const API_KEY = decryptAPIData(encryptedAPIKeyData);
  console.log("KEY: ", API_KEY);
  return `${BASE_API_URL}?access_key=${API_KEY}`;
};

const getStats = async (cryptoExchangeInstance) => {
  const API_URL = getAPIUrl();
  const response = await axios(API_URL);
  console.log("Live market prices: ", response.data);
};

getStats();
