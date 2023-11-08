const capitalize = (sentence?: string) => {
  if (!sentence) return "";
  const allWords = sentence.toLowerCase().split(" ");

  for (let i = 0; i < allWords.length; i++) {
    allWords[i] = allWords[i].charAt(0).toUpperCase() + allWords[i].slice(1);
  }

  return allWords.join(" ");
};

export default capitalize;
