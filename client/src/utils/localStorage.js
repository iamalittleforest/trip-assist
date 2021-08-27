export const removePOIId = (POIId) => {
  const savedPOIIds = localStorage.getItem('saved_POIs')
    ? JSON.parse(localStorage.getItem('saved_POIs'))
    : null;

  if (!savedPOIIds) {
    return false;
  }

  const updatedSavedPOIIds = savedPOIIds?.filter(
    (savedPOIId) => savedPOIId !== POIId
  );
  localStorage.setItem('saved_POIs', JSON.stringify(updatedSavedPOIIds));

  return true;
};
