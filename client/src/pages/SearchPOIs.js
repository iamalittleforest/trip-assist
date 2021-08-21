// import dependencies
import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { SAVE_POI } from "../utils/mutations";
import {} from "../utils/API";
// need to import saved POI logic when ready
import {} from "../utils/localStorage";
import Auth from "../utils/auth";

//API Key
const key = "AIzaSyAGMm8VfMoIWD35Z0G0dNAldoEokk20Vow";
// API urls
const baseURL1 =
  "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?&inputtype=textquery&fields=formatted_address,name,rating,opening_hours,geometry";
const baseURL2 =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?&radius=1500&type=tourist_attraction&key=AIzaSyAGMm8VfMoIWD35Z0G0dNAldoEokk20Vow";
const baseURL3 =
  "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=AIzaSyAGMm8VfMoIWD35Z0G0dNAldoEokk20Vow";

const SearchPOI = () => {
  // create state for holding returned google api data
  const [searchedPOIs, setSearchedPOIs] = useState([]);

  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved POI Id values
  const [savedPOIds, setSavedPOIds] = useState(getSavedPOIIds());

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
  // set up useEffect hook to save `savedPoiIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => savePOIIds(savedPOIIds);
  });

  // set mutation for saving Poi
  const [savePOI] = useMutation(SAVE_POI);

  // create method to search for POIs and set state on form submit
  const handleFormSubmit = () => {
    axios
      .get(`${baseURL1}&key=${key}&input=${searchInput}`)
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
  };

  // create function to handle saving a POI to our database
  const handleSavePOI = async (POIId) => {
    // find the poi in `searchedPois` state by the matching id
    const POIToSave = searchedPOIs.find((POI) => POI.POIId === POIId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // save POI
    try {
      const response = await savevPOI({
        variables: { POIToSave },
      });

      if (!response.data) {
        throw new Error("something went wrong!");
      }

      // if poi successfully saves to user's account, save POI id to state
      setSavedPOIIds([...savedPOIIds, POIToSave.POIId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          {/* Need a better title */}
          <h1>Search for your places of Interest!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  //   might need to change placholder
                  placeholder="Search for places to travel"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedPOIs.length
            ? `Viewing ${searchedPOIs.length} results:`
            : "Search for a POI to begin"}
        </h2>
        <CardColumns>
          {searchedPOIs.map((POI) => {
            return (
              <Card key={POI.POIId} border="dark">
                {POI.img ? (
                  <Card.Img
                    src={POI.img}
                    alt={`The cover for ${POI.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{POI.title}</Card.Title>
                  <p className="small">Authors: {POI.authors}</p>
                  <Card.Text>{POI.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedPOIIds?.some(
                        (savedPOIId) => savedPOIId === POI.POIId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSavePOI(POI.POIId)}
                    >
                      {savedPOIIds?.some(
                        (savedPOIId) => savedPOIId === POI.POISId
                      )
                        ? "This point of interest has already been saved!"
                        : "Save this point of interest!"}
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
