/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewEntreeDetails } from '../../api/mergedData';

export default function ViewEntree() {
  const [entreeDetails, setEntreeDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewEntreeDetails(firebaseKey).then(setEntreeDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img
          src={entreeDetails.image}
          alt={entreeDetails.name}
          style={{ width: '300px' }}
        />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {entreeDetails.name} made by {entreeDetails.restaurantObj?.restaurant_name}
        </h5>
        Restaurant Email:
        <a href={`mailto:${entreeDetails.restaurantObj?.email}`}>
          {entreeDetails.restaurantObj?.email}
        </a>
        <p>Description: {entreeDetails.description || ''}</p>
        <hr />
        <p>
          Quantity Available: {entreeDetails.quantity}
        </p>
        <p> Price: ${entreeDetails.price}</p>
      </div>
    </div>
  );
}
