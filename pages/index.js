/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Hello {user.displayName}! Welcome to The Hungry Local</h1>
      <br />
      <br />
      <div className="text-center d-flex justify-content-center align-content-center">
        <Link href="/entree/new" passHref>
          <Button>Add an Entree</Button>
        </Link>
        <Link href="/restaurant/new" passHref>
          <Button>Add a Restaurant</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
