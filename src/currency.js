const axios = require("axios");
const { decryptAPIData } = require("./crypto");

const encryptedAPIKey = {
  iv: "e56b2c2f6a3f94ae03a94ba81c7584b1",
  content: "2fb7dec1cb0a4526c4347491e9b660f10a025487",
};

const usdToInr = async () => {
  const BASE_API_URL = new URL("https://free.currconv.com/api/v7/convert");
  const searchParams = new URLSearchParams({
    q: "USD_INR",
    compact: "ultra",
    apiKey: decryptAPIData(encryptedAPIKey),
  });

  const API_URL = `${BASE_API_URL}?${searchParams.toString()}`;
  const response = await axios(API_URL);
  const currencyUnit = response.data["USD_INR"];
  return currencyUnit;
};

module.exports = {
  usdToInr,
};
