import { getRestaurantEntrees, getSingleRestaurant, deleteSingleRestaurant } from './restaurantData';
import { getSingleEntree, deleteEntree } from './entreeData';

const viewEntreeDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleEntree(firebaseKey)
    .then((entreeObj) => {
      getSingleRestaurant(entreeObj.restaurant_id)
        .then((restaurantObj) => {
          resolve({ restaurantObj, ...entreeObj });
        });
    }).catch((error) => reject(error));
});

const viewRestaurantDetails = (firebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleRestaurant(firebaseKey), getRestaurantEntrees(firebaseKey)])
    .then(([restaurantObject, restaurantsEntreesArray]) => {
      resolve({ ...restaurantObject, entrees: restaurantsEntreesArray });
    }).catch((error) => reject(error));
});

const deleteRestaurantEntrees = (restaurantId) => new Promise((resolve, reject) => {
  getRestaurantEntrees(restaurantId).then((entreesArray) => {
    console.warn(entreesArray, 'Restaurants Entrees');
    const deleteEntreesPromises = entreesArray.map((entree) => deleteEntree(entree.firebaseKey));

    Promise.all(deleteEntreesPromises).then(() => {
      deleteSingleRestaurant(restaurantId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewEntreeDetails, viewRestaurantDetails, deleteRestaurantEntrees };
