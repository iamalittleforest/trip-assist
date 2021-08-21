// import react dependencies
import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
<<<<<<< HEAD
} from "react-bootstrap";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { SAVE_POI } from "../utils/mutations";
import {} from "../utils/API";
// need to import saved POI logic when ready
import {} from "../utils/localStorage";
import Auth from "../utils/auth";

//API Key
const { REACT_APP_API_KEY } = process.env;
// API urls
const baseURL1 =
  "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry";
const baseURL2 = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?&radius=1500&type=tourist_attraction&key=${REACT_APP_API_KEY}`;
const baseURL3 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=${REACT_APP_API_KEY}`;

const SearchPOI = () => {
=======
} from 'react-bootstrap';

// import apollo dependency
import { useMutation } from '@apollo/client';

// import axios dependency
import axios from 'axios';

// import utils dependencies
import { SAVE_POI } from '../utils/mutations';
import { savePOIIds, getSavedPOIIds } from '../utils/localStorage';
import Auth from '../utils/auth';

// API Key
const key = 'AIzaSyAGMm8VfMoIWD35Z0G0dNAldoEokk20Vow';

// API urls
const getLocation =
  'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry';
const getPOIs =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?&radius=1500&type=tourist_attraction';
const getImgURL =
  'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400';

const SearchPOIs = () => {

>>>>>>> 51a879277a412db8fa1610672dd5d1906845bd24
  // create state for holding returned google api data
  const [searchedPOIs, setSearchedPOIs] = useState([]);

  // create state for holding input data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved POI Id values
<<<<<<< HEAD
  const [savedPOIIds, setSavedPOIIds] = useState(getSavedPOIIds());

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
=======
  const [savedPOIIds, setSavedPOIIds] = useState([]);

  // 
  const [POIs, setPOIs] = useState([]);

>>>>>>> 51a879277a412db8fa1610672dd5d1906845bd24
  // set up useEffect hook to save `savedPoiIds` list to localStorage on component unmount
  useEffect(() => {
    return () => savePOIIds(savedPOIIds);
  });

  // set mutation for saving POI
  const [savePOI] = useMutation(SAVE_POI);

  // create method to search for POIs and set state on form submit
<<<<<<< HEAD
  const handleFormSubmit = () => {
    axios
      .get(`${baseURL1}&key=${REACT_APP_API_KEY}}&input=${searchInput}`)
      .then((response) => {
        console.log("BaseURl1", response.data.candidates);
        const { lng, lat } = response.data.candidates[0].geometry.location;
        findAttractions(`${lat},${lng}`);
      });
    const searchedData = items
      .map((results) => ({
        POI_id: results.place_id,
        name: results.name,
        img: results.photos,
        business_status: results.business_status,
        rating: results.rating,
        vicinity: results.vicinity,
      }))

      .catch((error) => {
        console.log(error);
      });
=======
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!searchInput) {
      return false;
    }

    // use cached data if it exists
    if (localStorage.getItem(searchInput.toLowerCase().trim())) {
      console.log("using cached data ---");
      return setPOIs(JSON.parse(localStorage.getItem(searchInput.toLowerCase().trim())));
    }

    // get data from API
    try {
      console.log("searching using API --- ")
      axios
        .get(`${getLocation}&key=${key}&input=${searchInput}`)
        .then((res) => {
          console.log('getLocation', res.data.candidates);
          const { lat, lng } = res.data.candidates[0].geometry.location;
          findPOIs(`${lat},${lng}`);
        })
        .catch((err) => {
          console.log(err);
        });

      const findPOIs = (latlng) => {
        axios
          .get(`${getPOIs}&key=${key}&location=${latlng}`)
          .then(({ data }) => {
            console.log('getPOIs', data);
            getImgs(
              data.results.map((a) => a.photos?.[0].photo_reference),
              data.results
            );
          });
      };

      const getImgs = async (refs, POIs) => {
        const urls = refs.map((ref) =>
          ref
            ? `${getImgURL}&key=${key}&photo_reference=${ref}`
            : 'https://www.eduprizeschools.net/wp-content/uploads/2016/06/No_Image_Available.jpg'
        );
        const POI_Data =
          POIs.map((a, i) => {
            a.POI_id = a.place_id;
            a.url = urls[i];
            a.img = a.url;
            return a;
          });
        //store in state also store in localstorage for caching search results
        setPOIs(POI_Data);
        localStorage.setItem(searchInput.toLowerCase().trim(), JSON.stringify(POI_Data))
      };

      // const { POIs } = await response.json();

      // const POIData = POIs.map((POI) => ({
      //   POI_id: POI.POI_id,
      //   name: POI.name,
      //   img: POI.photos,
      //   business_status: POI.business_status,
      //   rating: POI.rating,
      //   vicinity: POI.vicinity,
      // }));

      // setSearchedPOIs(POIData);
      // setSearchInput('');
    } catch (err) {
      console.error(err);
    }
>>>>>>> 51a879277a412db8fa1610672dd5d1906845bd24
  };

  // create function to handle saving a POI to our database
  const handleSavePOI = async (POI_id) => {
    // find the poi in `searchedPOIs` state by the matching id
    const POIToSave = searchedPOIs.find((POI) => POI.POI_id === POI_id);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // save POI
    try {
      const res = await savePOI({
        variables: { POIToSave },
      });

      if (!res.data) {
        throw new Error('something went wrong!');
      }

      // if POI successfully saves to user's account, save POI id to state
      setSavedPOIIds([...savedPOIIds, POIToSave.POI_id]);
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for places to go!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Enter City Name'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {POIs.length
            ? `Viewing ${POIs.length} results:`
            : 'Search for a POI to begin'}
        </h2>
        <CardColumns>
          {POIs.map((POI) => {
            return (
              <Card key={POI.POI_id} border='dark'>
                {POI.img ? (
                  <Card.Img
                    src={POI.img}
                    alt={`The cover for ${POI.name}`}
                    variant='top'
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{POI.name}</Card.Title>
                  <Card.Text>
                    Status: {POI.business_status}
                  </Card.Text>
                  <Card.Text>
                    Rating: {POI.rating}
                  </Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedPOIIds?.some(
                        (savedPOIId) => savedPOIId === POI.POI_id
                      )}
                      className='btn-block btn-info'
                      onClick={() => handleSavePOI(POI.POI_id)}
                    >
                      {savedPOIIds?.some(
                        (savedPOIId) => savedPOIId === POI.POI_id
                      )
                        ? 'This point of interest has already been saved!'
                        : 'Save this point of interest!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchPOIs;
