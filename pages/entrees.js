/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getEntrees } from '../api/entreeData';
import EntreeCard from '../components/entreeCard';

function Home() {
  const { user } = useAuth();
  const [entrees, setEntrees] = useState([]);

  const getMyEntrees = () => {
    getEntrees(user.uid).then(setEntrees);
  };

  useEffect(() => {
    getMyEntrees();
  }, []);

  return (
    <div>
      <br />
      <div className="text-center d-flex justify-content-center align-content-center">
        <Link href="/entree/new" passHref>
          <Button>Add an Entree</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap">
        {entrees.map((entree) => (
          <EntreeCard key={entree.firebaseKey} entreeObj={entree} onUpdate={getMyEntrees} />
        ))}
      </div>
    </div>
  );
}

export default Home;
