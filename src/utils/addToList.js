// src/utils/addToList.js

export const getSavedItems = (type) => {
  const saved = localStorage.getItem(`saved${type}`);
  return saved ? JSON.parse(saved) : [];
};

export const isItemSaved = (type, id) => {
  const saved = getSavedItems(type);
  return saved.some(item => item.id === id);
};

export const saveItem = (type, item) => {
  const saved = getSavedItems(type);

  console.log("📦 Raw item before processing:", item);

  // Flexible title handling (TMDb or capitalized)
  const title =
    item.title ||
    item.name ||
    item.original_title ||
    item.original_name ||
    item.Title || // fallback for capitalized
    'Untitled';

  // Flexible image handling
  const image =
    (item.poster_path && `https://image.tmdb.org/t/p/w500${item.poster_path}`) ||
    item.background_image ||
    item.image?.original ||
    item.cover ||
    item.Poster || // fallback for capitalized
    null;

  // Flexible rating handling
  const rating =
    item.vote_average ||
    item.rating ||
    item.score ||
    (typeof item.average === 'object'
      ? item.average?.rating
      : item.average) ||
    null;

  const minimalItem = {
    id: item.id,
    title,
    rating,
    image,
  };

  console.log("💾 Saving item to localStorage:", minimalItem);

  if (!isItemSaved(type, minimalItem.id)) {
    saved.push(minimalItem);
    localStorage.setItem(`saved${type}`, JSON.stringify(saved));
  }
};

export const removeItem = (type, id) => {
  const saved = getSavedItems(type).filter(item => item.id !== id);
  localStorage.setItem(`saved${type}`, JSON.stringify(saved));
};
