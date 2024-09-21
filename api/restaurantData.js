import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getRestaurants = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/restaurants.json?orderBy="uid"&equalTo="${uid}"`, {
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

const deleteSingleRestaurant = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/restaurants/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

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
