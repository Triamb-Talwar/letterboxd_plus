export const getSavedItems = (type) => {
  const saved = localStorage.getItem(`saved${type}`);
  return saved ? JSON.parse(saved) : [];
};

export const isItemSaved = (type, id) => {
  const saved = getSavedItems(type);
  return saved.some(item => String(item.id) === String(id)); // normalize ID
};

export const saveItem = (type, item) => {
  const saved = getSavedItems(type);

  console.log("📦 Raw item before processing:", item);

  const title =
    item.title ||
    item.name ||
    item.original_title ||
    item.original_name ||
    item.Title || // capitalized fallback
    item.book_title || // Open Library
    'Untitled';

  const image =
    (item.poster_path && `https://image.tmdb.org/t/p/w500${item.poster_path}`) ||
    item.background_image ||
    item.cover ||
    item.image?.original ||
    item.Poster || // OMDb/other
    (item.cover_i && `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`) || // Open Library
    null;

  const rating =
    item.vote_average ||
    item.rating ||
    item.score ||
    (typeof item.average === 'object'
      ? item.average?.rating
      : item.average) ||
    null;

  const minimalItem = {
    id: item.id || item.key || item.imdbID || item.cover_i || `${title}`, // fallback if no ID
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
  const saved = getSavedItems(type).filter(item => String(item.id) !== String(id));
  localStorage.setItem(`saved${type}`, JSON.stringify(saved));
};