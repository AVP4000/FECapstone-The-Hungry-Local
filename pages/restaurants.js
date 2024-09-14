import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getRestaurants } from '../api/restaurantData';
import RestaurantCard from '../components/restaurantCard';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  const getAllRestaurants = () => {
    getRestaurants().then(setRestaurants);
  };

  useEffect(() => {
    getAllRestaurants();
  }, []); // Added empty dependency array

  return (
    <div className="text-center my-4">
      <Link href="/restaurant/new" passHref>
        <Button>Add A Restaurant</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.firebaseKey}
            restaurantObj={restaurant}
            onUpdate={getAllRestaurants}
          />
        ))}
      </div>
    </div>
  );
}
