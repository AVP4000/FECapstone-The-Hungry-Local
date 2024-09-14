/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewRestaurantDetails } from '../../api/mergedData';
import RestaurantCard from '../../components/restaurantCard';

export default function ViewRestaurant() {
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getTheRestaurantDetails = () => {
    viewRestaurantDetails(firebaseKey).then(setRestaurantDetails);
  };

  useEffect(() => {
    viewRestaurantDetails(firebaseKey).then(setRestaurantDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>
          {restaurantDetails.restaurant_name}
        </h5>
        <a href={`mailto:${restaurantDetails.restaurantObject?.email}`}>
          {restaurantDetails.restaurantObject?.email}
        </a>
        <div>
          {restaurantDetails.entrees?.map((entree) => (
            <RestaurantCard
              key={entree.firebaseKey}
              entreeObj={entree}
              onUpdate={getTheRestaurantDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
