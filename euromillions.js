const axios = require("axios");
const cheerio = require("cheerio");
const inquirer = require("inquirer");
const users = require("./users.json");

const askDate = async () => {
  const questions = [
    {
      type: "input",
      name: "date",
      message:
        "What date do you want the results for, format: DD-MM-YYYY, hit ENTER to use date of today?",
    },
  ];

  const answers = await inquirer.prompt(questions);

  if (answers["date"]) {
    return answers["date"];
  } else {
    const date = new Date();
    return (
      date.getDate().toString().padStart(2, "0") +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getFullYear().toString()
    );
  }
};

const getResults = async (date) => {
  try {
    const { data } = await axios.get(
      `https://www.euro-millions.com/results/${date}`
    );
    const $ = cheerio.load(data);
    let numbers = [];

    $("#ballsAscending > ul > li.new").each((_idx, el) => {
      const number = $(el).text();
      numbers.push(number);
    });

    numbers = numbers.map((a) => +a);
    const stars = numbers.splice(numbers.length - 2, 2);
    return { numbers, stars };
  } catch (error) {
    throw error;
  }
};

const calculateResultForUser = (user, numbers, stars) => {
  let matchingNumbers = "";
  let matchingStars = "";

  for (let i = 0; i < user.numbers.length; i++) {
    if (numbers.includes(user.numbers[i])) {
      matchingNumbers += ` ${user.numbers[i]}`;
    }
  }

  for (let i = 0; i < user.stars.length; i++) {
    if (stars.includes(user.stars[i])) {
      matchingStars += ` ${user.stars[i]}`;
    }
  }

  console.log(`${user.name}`);
  console.log("numbers: ", matchingNumbers);
  console.log("stars: ", matchingStars);
  console.log("------------------------------------------");
};

const euromillions = (numbers, stars, users) => {
  for (let i = 0; i < users.length; i++) {
    calculateResultForUser(users[i], numbers, stars);
  }
};

askDate().then((date) => {
  getResults(date)
    .then((result) => {
      console.log(`numbers: ${result.numbers}, stars: ${result.stars}`);
      console.log("==========================================");
      euromillions(result.numbers, result.stars, users);
    })
    .catch(() => console.log("No results for this date!"));
});
