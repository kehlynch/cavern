export const joinWithAnd = (words) => {
  if (words.length == 1) {
    return words[0];
  }
  const lastWord = words.pop();
  return `${words.join(', ')} and ${lastWord}`;
};

export const joinWithArticle = (words) => {
  const wordsWithArticles = words.map((word) => {
    const initialVowel = ['a', 'e', 'i', 'o', 'u'].includes(word[0].toLowerCase());
    const article = initialVowel ? 'an' : 'a';
    return `${article} ${word}`;
  });
  return joinWithAnd(wordsWithArticles);
};
