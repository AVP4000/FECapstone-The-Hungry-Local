import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EntreeForm from '../../../components/entreeForm';
import { getSingleEntree } from '../../../api/entreeData';

export default function EditEntree() {
    const [editItem, setEditItem] = useState({});
    const router = useRouter();
    const { firebaseKey } = router.query;
  
    useEffect(() => {
      getSingleEntree(firebaseKey).then(setEditItem);
    }, [firebaseKey]);
  
    return (<EntreeForm obj={editItem} />);
  }