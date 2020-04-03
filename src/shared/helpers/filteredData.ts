const filteredData = (resultsJokes, randomJoke, isFeelingLucky) => {
  if (resultsJokes && randomJoke) {
    const { result, total } = resultsJokes;
    const filteredByResults = total > 0 ? result : [randomJoke];

    return isFeelingLucky ? [filteredByResults[0]] : filteredByResults;
  }
};

export default filteredData;
