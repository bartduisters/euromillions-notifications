function winAmount(numbers, stars, earnings) {
  for (let i = 0; i < earnings.length; i++) {
    if (
      earnings[i].numbers === numbers.length &&
      earnings[i].stars === stars.length
    ) {
      return earnings[i].prize;
    }
  }
  return 0;
}

module.exports = {
  calculateResultForUser: (user, numbers, stars, earnings) => {
    let matchingNumbers = [];
    let matchingStars = [];

    for (let i = 0; i < user.numbers.length; i++) {
      if (numbers.includes(user.numbers[i])) {
        matchingNumbers.push(user.numbers[i]);
      }
    }

    for (let i = 0; i < user.stars.length; i++) {
      if (stars.includes(user.stars[i])) {
        matchingStars.push(user.stars[i]);
      }
    }

    const winnings = winAmount(matchingNumbers, matchingStars, earnings);

    console.log(`${user.name}`);
    console.log("numbers: ", matchingNumbers.toString());
    console.log("stars: ", matchingStars.toString());
    console.log("winnings: ", winnings);
    console.log("------------------------------------------");
  },
};
