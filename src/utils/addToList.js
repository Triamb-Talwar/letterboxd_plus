// src/utils/addToList.js

export function getSavedItems(type) {
  const data = localStorage.getItem(`saved_${type.toLowerCase()}`);
  return data ? JSON.parse(data) : [];
}

export function saveItem(type, item) {
  const items = getSavedItems(type);
  if (!items.find(i => i.id === item.id)) {
    items.push(item);
    localStorage.setItem(`saved_${type.toLowerCase()}`, JSON.stringify(items));
  }
}

export function removeItem(type, id) {
  const items = getSavedItems(type).filter(item => item.id !== id);
  localStorage.setItem(`saved_${type.toLowerCase()}`, JSON.stringify(items));
}
