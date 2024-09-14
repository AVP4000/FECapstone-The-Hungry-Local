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
  
  useEffect(() => {getMyEntrees();}, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! Welcome to The Hungry Local</h1>

<div className="text-center my-4">
<Link href="/entree/new" passHref>
<Button>Add A entree</Button>
</Link>
<Link href="/restaurant/new" passHref>
<Button>Add A restaurant</Button>
</Link>
<div className="d-flex flex-wrap">
        {entrees.map((entree) => (
          <EntreeCard key={entree.firebaseKey} entreeObj={entree} onUpdate={getMyEntrees} />
        ))}
      </div>
    </div>

    </div>
  );
}

export default Home;
