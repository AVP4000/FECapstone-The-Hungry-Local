import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewRestaurantDetails } from '../../api/mergedData';
import EntreeCard from '../../components/entreeCard';

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
        <a href={`mailto:${restaurantDetails.restaurantObj?.email}`}>
          {restaurantDetails.restaurantObj?.email}
        </a>
        <div>
          {restaurantDetails.entrees?.map((entree) => (
            <EntreeCard
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
