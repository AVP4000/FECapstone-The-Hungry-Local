import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getRestaurants } from '../../api/restaurantData';
import { createEntree, updateEntree } from '../../api/entreeData';

const initialState = {
  description: '',
  image: '',
  price: '',
  quantity: '',
  name: '',
};

function EntreeForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getRestaurants(user.uid).then(setRestaurants);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateEntree(formInput).then(() => router.push(`/entree/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createEntree(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateEntree(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Entree</h2>

      {/* Name INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Entree Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter an Entree Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Entree Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Entree Price" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Quanity INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Entree Quantity" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a quantity"
          name="quantity"
          value={formInput.quantity}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Restaurant SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Restaurant">
        <Form.Select
          aria-label="Restaurant"
          name="restaurant_id"
          onChange={handleChange}
          className="mb-3"
          value={obj.restaurant_id}
          required
        >
          <option value="">Select a Restaurant</option>
          {
            restaurants.map((restaurant) => (
              <option
                key={restaurant.firebaseKey}
                value={restaurant.firebaseKey}
              >
                {restaurant.restaurant_name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Entree</Button>
    </Form>
  );
}

EntreeForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.string,
    name: PropTypes.string,
    restaurant_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

EntreeForm.defaultProps = {
  obj: initialState,
};

export default EntreeForm;
