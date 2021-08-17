// import dependencies
import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { POI } from '../utils/mutations';
import {} from '../utils/localStorage';
import Auth from '../utils/auth';

const SavedPoi = () => {

  // set query for pulling data
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  // set mutation for removing POI
  const [removePoi] = useMutation(REMOVE_POI);

  // create function that accepts the POI's mongo _id value as param and deletes the POI from the database
  const handleDeletePoi = async (poiId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // remove POI
    try {
      const response = await removePoi({
        variables: { poiId },
      });

      if (!response.data) {
        throw new Error('something went wrong!');
      }

      // upon success, remove POI's id from localStorage
      removePoiId(poiId);
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
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
            {/* Might need to change title later */}
          <h1>Viewing saved POI!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedPoi.length
            ? `Viewing ${userData.savedPoi.length} saved ${userData.savedPoi.length === 1 ? 'poi' : 'pois'}:`
            : 'You have no saved POI!'}
        </h2>
        <CardColumns>
          {userData.savedPois.map((poi) => {
            return (
              <Card key={poi.poiId} border='dark'>
                {poi.image ? <Card.Img src={poi.image} alt={`The cover for ${poi.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{poi.title}</Card.Title>
                  <p className='small'>Authors: {poi.authors}</p>
                  <Card.Text>{poi.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeletePoi(poi.poiId)}>
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

export default SavedPois;