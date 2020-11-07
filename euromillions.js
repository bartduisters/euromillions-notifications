const users = require("./src/assets/users.json");
const {
  getResults,
  getEarnings,
} = require("./src/services/euro-millions.service");
const { askDate } = require("./src/questions");
const { calculateResultForUser } = require("./src/calculations");

askDate().then((date) => {
  getResults(date)
    .then((result) => {
      getEarnings(date).then((earnings) => {
        console.log(`numbers: ${result.numbers}, stars: ${result.stars}`);
        console.log("==========================================");
        for (let i = 0; i < users.length; i++) {
          calculateResultForUser(
            users[i],
            result.numbers,
            result.stars,
            earnings
          );
        }
      });
    })
    .catch(() => console.log("No results for this date!"));
});
