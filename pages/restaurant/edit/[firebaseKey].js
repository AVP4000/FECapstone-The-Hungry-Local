import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RestaurantForm from '../../../components/restaurantForm';
import { getSingleRestaurant } from '../../../api/restaurantData';

export default function EditRestaurant() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleRestaurant(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <RestaurantForm obj={editItem} />
  );
}
