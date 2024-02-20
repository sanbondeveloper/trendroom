export const dollarToWon = (dollar: number) => dollar * 1100;

const removeDuplicatesFromArray = <T>(array: T[]) => {
  return array.filter((value, index, self) => self.indexOf(value) === index);
};

export const ellipsisText = (text: string) => {
  if (text.length > 10) return `${text.slice(0, 10)}...`;

  return text;
};

export const getRecentSearches = (): string[] => {
  const recentSearches = localStorage.getItem('recentSearches');

  return recentSearches ? JSON.parse(recentSearches) : [];
};

export const setRecentSearches = (recentSearches: string[]) => {
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
};

export const updateRecentSearches = (query: string) => {
  const recentSearches = getRecentSearches();

  const newRecentSearches = [query, ...recentSearches];
  const limitedRecentSearches = removeDuplicatesFromArray(newRecentSearches.slice(0, 10));

  setRecentSearches(limitedRecentSearches);
};

export const removeRecentSearches = (query: string) => {
  const recentSearches = getRecentSearches();
  const newRecentSearches = recentSearches.filter((recentSearch) => recentSearch !== query);

  setRecentSearches(newRecentSearches);
};
