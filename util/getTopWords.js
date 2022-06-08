module.exports = (messages, minWord = 5) => {
  let setOfWords = new Set();
  for (const msg of messages) {
    for (const word of msg.message.split(" ")) {
      setOfWords.add(word);
    }
  }
  let topWords = {};
  for (const uniqueWord of setOfWords) {
    topWords[uniqueWord] = 0;
    for (const msg of messages) {
      for (const word of msg.message.split(" "))
        if (word == uniqueWord) topWords[uniqueWord]++;
    }
    if (topWords[uniqueWord] < minWord) delete topWords[uniqueWord];
  }
  return getTopTen(topWords);
};

const getTopTen = (topWords) => {
  const sortedWords = Object.fromEntries(
    Object.entries(topWords).sort(([, a], [, b]) => b - a)
  );
  let topTen = {};
  const words = Object.keys(sortedWords);
  for (let i = 0; i < (words.length > 10 ? 10 : words.length); i++)
    topTen[words[i]] = sortedWords[words[i]];
  return topTen;
};
