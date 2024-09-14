import { getRestaurantEntrees, getSingleRestaurant, deleteSingleRestaurant } from './restaurantData';
import { getSingleEntree, deleteEntree } from './entreeData';

const viewEntreeDetails = (entreeFirebaseKey) => new Promise((resolve, reject) => {
  getSingleEntree(entreeFirebaseKey)
    .then((entreeObject) => {
      getSingleRestaurant(restaurantObject.restaurant_id)
        .then((restaurantObject) => {
          resolve({ restaurantObject, ...entreeObject });
        });
    }).catch((error) => reject(error));
});

const viewRestaurantDetails = (restaurantFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleRestaurant(restaurantFirebaseKey), getRestaurantEntrees(restaurantFirebaseKey)])
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
