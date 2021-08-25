export const getSavedPOIIds = () => {
  const savedPOIIds = localStorage.getItem('saved_POIs')
    ? JSON.parse(localStorage.getItem('saved_POIs'))
    : [];

  return savedPOIIds;
};

export const savePOIIds = (POIIdArr) => {
  if (POIIdArr.length) {
    localStorage.setItem('saved_POIs', JSON.stringify(POIIdArr));
  } else {
    localStorage.removeItem('saved_POIs');
  }
};

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
