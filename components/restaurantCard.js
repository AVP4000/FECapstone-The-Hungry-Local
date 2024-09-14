import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleRestaurant } from '../api/restaurantData';

function RestaurantCard({ restaurantObj, onUpdate }) {
  const deleteThisRestaurant = () => {
    if (window.confirm(`Delete ${restaurantObj.restaurant_name}?`)) {
      deleteSingleRestaurant(restaurantObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={restaurantObj.logo} alt={restaurantObj.restaurant_name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{restaurantObj.restaurant_name}</Card.Title>
        <p className="card-text bold">{restaurantObj}.email</p>
        <p className="card-text bold">{restaurantObj}.bio</p>
        <Link href={`/restaurant/${restaurantObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/restaurants/edit/${restaurantObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisRestaurant} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

RestaurantCard.propTypes = {
  restaurantObj: PropTypes.shape({
    email: PropTypes.string,
    logo: PropTypes.string,
    restaurant_name: PropTypes.string,
    bio: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RestaurantCard;
