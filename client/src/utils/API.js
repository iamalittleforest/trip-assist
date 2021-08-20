import React, { useState, Component } from "react";
import axios from "axios";
import Card from "../components/POICard";


const key = "AIzaSyAGMm8VfMoIWD35Z0G0dNAldoEokk20Vow";
const baseURL1 =
  "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry";
const baseURL2 =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?&radius=1500&type=tourist_attraction&key=AIzaSyAGMm8VfMoIWD35Z0G0dNAldoEokk20Vow";
const baseURL3 =
  "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=AIzaSyAGMm8VfMoIWD35Z0G0dNAldoEokk20Vow";

function API() {
  const [input, setInput] = useState("");
  const [attractions, setAttractions] = useState([]);
  const findAttractions = (lonlat) => {
    axios.get(baseURL2 + "&location=" + lonlat).then(({ data }) => {
      console.log("Raw data", data);
      getImgs(
        data.results.map((a) => a.photos?.[0].photo_reference),
        data.results
      );
    });
  };

  const getImgs = async (refs, attractions) => {
    const urls = refs.map((ref) =>
      ref
        ? baseURL3 + "&photo_reference=" + ref
        : "https://cdn.shopify.com/s/files/1/0054/4371/5170/products/FiGPiN_360HelloKittySANRIOPIN.png?v=1627413934"
    );
    setAttractions(
      attractions.map((a, i) => {
        a.url = urls[i];
        return a;
      })
    );
  };

  const handleSearch = () => {
    axios
      .get(`${baseURL1}&key=${key}&input=${input}`)
      .then((response) => {
        console.log("BaseURl1", response.data.candidates);
        const { lng, lat } = response.data.candidates[0].geometry.location;
        findAttractions(`${lat},${lng}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="API">
        <input onChange={({ target: { value } }) => setInput(value)} />
      </div>
      <button onClick={handleSearch}>SEARCH</button>
      {attractions.map((attraction) => (
        <>
          <Card
            url={attraction.url}
            name={attraction.name}
            rating={attraction.rating}
          />
        </>
      ))}
    </>
  );
}


export default API;