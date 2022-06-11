module.exports = (messages, minWord = 5) => {
  let bagOfWords = {};
  for (const singleMessage of messages)
    for (const word of singleMessage.message.split(" "))
      if (isNaN(word) && word.length > 1)
        if (bagOfWords[word]) bagOfWords[word]++;
        else bagOfWords[word] = 1;
  for (const word in bagOfWords)
    if (bagOfWords[word] < minWord) delete bagOfWords[word];
  return getTopTen(bagOfWords);
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
