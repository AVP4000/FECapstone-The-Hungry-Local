import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

//  GET ALL RESTAURANTS
const getRestaurants = () => new Promise((resolve, reject) => {
    fetch(`${endpoint}/restaurants.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });
  
  //  CREATE RESTAURANTS
  const createRestaurant = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/restaurants.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });
  
  //  GET SINGLE AUTHOR
  const getSingleRestaurant = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/restaurants/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });
  
  //  DELETE AUTHOR
  const deleteSingleRestaurant = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/restaurants/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });
  
  //  UPDATE AUTHOR
  const updateRestaurant = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/restaurants/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });
  
  // GET A SINGLE RESTAURANT'S ENTREES
  const getRestaurantEntrees = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/entrees.json?orderBy="restaurant_id"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

  export {
    getRestaurants,
    createRestaurant,
    getSingleRestaurant,
    deleteSingleRestaurant,
    updateRestaurant,  
    getRestaurantEntrees,
};