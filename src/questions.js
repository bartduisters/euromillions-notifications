const inquirer = require("inquirer");

function currentDate() {
  const date = new Date();
  return (
    date.getDate().toString().padStart(2, "0") +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getFullYear().toString()
  );
}

module.exports = {
  askDate: async () => {
    const questions = [
      {
        type: "input",
        name: "date",
        message:
          "What date do you want the results for? format: DD-MM-YYYY, hit ENTER to use date of today",
      },
    ];

    const answers = await inquirer.prompt(questions);

    if (answers["date"]) {
      return answers["date"];
    } else {
      return currentDate();
    }
  },
};
