import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

  // GET ENTREE
const getEntrees = () => new Promise((resolve, reject) => {
    fetch(`${endpoint}/entrees.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });
  
  // DELETE ENTREE
  const deleteEntree = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/entrees/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve((Object.values(data))))
      .catch(reject);
  });
  
  // GET SINGLE ENTREE
  const getSingleEntree = (firebaseKey) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/entrees/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });
  
  // CREATE ENTREE
  
  const createEntree = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/entrees.json`, {
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
  
  // UPDATE ENTREE
  const updateEntree = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/entrees/${payload.firebaseKey}.json`, {
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

  const getEntreesByRestaurant = (firebaseKey) => new Promise((resolve, reject) => {
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
    getEntrees,
    createEntree,
    deleteEntree,
    getSingleEntree,
    updateEntree,
    getEntreesByRestaurant,
};
