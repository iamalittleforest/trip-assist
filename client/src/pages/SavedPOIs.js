// import dependencies
import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_POI } from "../utils/mutations";
import { removePOIId } from "../utils/localStorage";
import Auth from "../utils/auth";

const SavedPOIs = () => {
  // set query for pulling data
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  // set mutation for removing POI
  const [removePOI] = useMutation(REMOVE_POI);

  // create function that accepts the POI's mongo _id value as param and deletes the POI from the database
  const handleDeletePOI = async (POI_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // remove POI
    try {
      const response = await removePOI({
        variables: { POI_id },
      });

      if (!response.data) {
        throw new Error("something went wrong!");
      }

      // upon success, remove POI's id from localStorage
      removePOIId(POI_id);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          {/* Might need to change title later */}
          <h1>Viewing saved POIs!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedPOIs.length
            ? `Viewing ${userData.savedPOIs.length} saved ${
                userData.savedPOIs.length === 1 ? "POI" : "POIs"
              }:`
            : "You have no saved POI!"}
        </h2>
        <CardColumns>
          {userData.savedPOIs.map((POI) => {
            return (
              <Card key={POI.POI_id} border="dark">
                {POI.img ? (
                  <Card.Img
                    src={POI.img}
                    alt={`The cover for ${POI.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{POI.name}</Card.Title>
                  <p className="small">Vicinity: {POI.vicinity}</p>
                  {/* instead of description use rating? */}
                  <p className="small">
                    Business Status: {POI.business_status}
                  </p>
                  <Card.Text> Rating: {POI.rating}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeletePOI(POI.POI_id)}
                  >
                    {/* Might have to change line below later  */}
                    Delete this POI!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedPOIs;
