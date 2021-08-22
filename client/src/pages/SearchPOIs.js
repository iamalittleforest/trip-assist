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
} from 'react-bootstrap';

// import apollo dependency
import { useMutation, useQuery } from '@apollo/client';

// import axios dependency
import axios from 'axios';

// import utils dependencies
import { SAVE_POI } from '../utils/mutations';
import { QUERY_KEY } from '../utils/queries';
import { savePOIIds, getSavedPOIIds } from '../utils/localStorage';
import Auth from '../utils/auth';

// API urls
const getLocation =
  'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry';
const getPOIs =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?&radius=1500&type=tourist_attraction';
const getImgURL =
  'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400';

// search for POIs
const SearchPOIs = () => {

  // create state for holding returned API data
  const [searchedPOIs, setSearchedPOIs] = useState([]);
  // create state for holding input data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved POI Id values
  const [savedPOIIds, setSavedPOIIds] = useState(getSavedPOIIds());
  // create state to hold API key
  const [key, setKey] = useState('');
  // set query for getting API key
  const { loading, data } = useQuery(QUERY_KEY);
  // set mutation for saving POI
  const [savePOI] = useMutation(SAVE_POI);

  // set up useEffect hook to save `savedPoiIds` list to localStorage
  useEffect(() => {
    return () => savePOIIds(savedPOIIds);
  });

  // set up useEffect hook to getKey
  useEffect(() => {
    !loading && setKey(data?.getKey);
  }, [loading]);

  // create method to search for POIs and set state on form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!searchInput) {
      return false;
    }

    // use cached data if it exists
    if (localStorage.getItem(searchInput.toLowerCase().trim())) {
      console.log('using cached data ---');
      
      return setSearchedPOIs(
        JSON.parse(localStorage.getItem(searchInput.toLowerCase().trim()))
      );
    }

    // get data from API
    try {
      console.log('using API --- ');

      // get location from input
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

      // use location to get nearby POIs
      const findPOIs = (latlng) => {
        axios
          .get(`${getPOIs}&key=${key}&location=${latlng}`)
          .then(({ data }) => {
            console.log('getPOIs', data);
            getImgs(
              data.results.map((POI) => POI.photos?.[0].photo_reference),
              data.results
            );
          });
      };
    } catch (err) {
      console.error(err);
    }
  }

  // use POIs to get imgs
  const getImgs = async (photoRefs, searchedPOIs) => {

    // get img URLs
    const imgUrls = photoRefs.map((photoRef) =>
      photoRef
        ? `${getImgURL}&key=${key}&photo_reference=${photoRef}`
        : 'https://www.eduprizeschools.net/wp-content/uploads/2016/06/No_Image_Available.jpg'
    );

    // save POI data
    const POIData = searchedPOIs.map((POI, i) => ({
      POI_id: POI.place_id,
      name: POI.name,
      img: imgUrls[i],
      business_status: POI.business_status,
      rating: POI.rating,
    }));

    // save POI data to localStorage
    localStorage.setItem(
      searchInput.toLowerCase().trim(),
      JSON.stringify(POIData)
    );

    // save POI data to state
    setSearchedPOIs(POIData);
    // clear search
    setSearchInput('');
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
      const response = await savePOI({
        variables: { POIToSave },
      });

      if (!response.data) {
        throw new Error('something went wrong!');
      }

      // save POI id to state
      setSavedPOIIds([...savedPOIIds, POIToSave.POI_id]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Where do you want to go?</h1>
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
        <CardColumns>
          {searchedPOIs.map((POI) => {
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
                  <Card.Text>Status: {POI.business_status}</Card.Text>
                  <Card.Text>Rating: {POI.rating}</Card.Text>
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
                        ? 'Saved to Collection'
                        : 'Add to Collection'}
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
