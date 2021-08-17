export const getSavedPoiIds = () => {
    const savedPoiIds = localStorage.getItem('saved_pois')
      ? JSON.parse(localStorage.getItem('saved_pois'))
      : [];
  
    return savedPoiIds;
  };
  
  export const savePoiIds = (poiIdArr) => {
    if (poiIdArr.length) {
      localStorage.setItem('saved_pois', JSON.stringify(poiIdArr));
    } else {
      localStorage.removeItem('saved_pois');
    }
  };
  
  export const removePoiId = (poiId) => {
    const savedPoiIds = localStorage.getItem('saved_pois')
      ? JSON.parse(localStorage.getItem('saved_pois'))
      : null;
  
    if (!savedPoiIds) {
      return false;
    }
  
    const updatedSavedPoiIds = savedPoiIds?.filter((savedPoiId) => savedPoiId !== poiId);
    localStorage.setItem('saved_pois', JSON.stringify(updatedSavedPoiIds));
  
    return true;
  };