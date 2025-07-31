export const getAllCustomLists = () => {
  const data = localStorage.getItem("customLists");
  return data ? JSON.parse(data) : [];
};

export function saveCustomList(listName, items) {
  const current = JSON.parse(localStorage.getItem('customLists') || '[]');
  const updated = [...current, { listName, items }];
  localStorage.setItem('customLists', JSON.stringify(updated));
}

