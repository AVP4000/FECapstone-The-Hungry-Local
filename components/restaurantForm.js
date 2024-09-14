import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createRestaurant, updateRestaurant } from '../api/restaurantData';

const initialState = {
  restaurant_name: '',
  email: '',
  logo: '',
  bio: '',
};

function RestaurantForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
      updateRestaurant(formInput).then(() => router.push(`/restaurant/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createRestaurant(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateRestaurant(patchPayload).then(() => {
          router.push('/restaurants');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Restaurant</h2>

      <FloatingLabel controlId="floatingInput21" label="Restaurant Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Restaurant Name"
          name="restaurant_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Logo" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an logo url"
          name="logo"
          value={formInput.logo}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput23" label="Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Restaurant Email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput22" label="Bio" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Restaurant Bio"
          name="bio"
          value={formInput.bio}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Restaurant</Button>
    </Form>
  );
}

RestaurantForm.propTypes = {
  obj: PropTypes.shape({
    restaurant_name: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    logo: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

RestaurantForm.defaultProps = {
  obj: initialState,
};

export default RestaurantForm;
