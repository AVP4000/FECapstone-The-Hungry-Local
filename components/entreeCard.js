import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteEntree } from '../api/entreeData';

function EntreeCard({ entreeObj, onUpdate }) {
  const deleteThisEntree = () => {
    if (window.confirm(`Delete ${entreeObj.name}?`)) {
      deleteEntree(entreeObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={entreeObj.image} alt={entreeObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{entreeObj.name}</Card.Title>
        <p className="card-text bold">${entreeObj.price}</p>
        <p className="card-text bold">${entreeObj.quantity}</p>
        <Link href={`/entree/${entreeObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/entrees/edit/${entreeObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisEntree} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

EntreeCard.propTypes = {
  entreeObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EntreeCard;