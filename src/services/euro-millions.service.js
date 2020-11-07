const axios = require("axios");
const cheerio = require("cheerio");
const baseUrl = "https://www.euro-millions.com";
const results = require("../assets/euromillion-results.json");

module.exports = {
  getResults: async (date) => {
    try {
      const { data } = await axios.get(`${baseUrl}/results/${date}`);
      const $ = cheerio.load(data);
      let numbers = [];
      $("#ballsAscending > ul > li.new").each((_idx, el) => {
        const number = $(el).text();
        numbers.push(number);
      });

      numbers = numbers.map((number) => +number);
      const stars = numbers.splice(numbers.length - 2, 2);
      return { numbers, stars };
    } catch (error) {
      throw error;
    }
  },

  getEarnings: async (date) => {
    try {
      const { data } = await axios.get(`${baseUrl}/results/${date}`);
      const $ = cheerio.load(data);

      let prizes = [];

      for (let i = 1; i < 14; i++) {
        const prize = $(
          `#content > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`
        )
          .text()
          .trim();

        prizes.push({ ...results[i - 1], prize });
      }

      return prizes;
    } catch (error) {
      throw error;
    }
  },
};
