import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddStore from '../components/AddStore';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const resUser = await axios.get('http://localhost:5002/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(resUser.data.user);

        const resStores = await axios.get('http://localhost:5002/api/stores', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStores(resStores.data.stores);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleStoreAdded = (newStore) => setStores([...stores, newStore]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>

      <AddStore onStoreAdded={handleStoreAdded} />

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Your Stores</h3>
        {stores.length === 0 ? (
          <p>No stores added yet.</p>
        ) : (
          <ul>
            {stores.map((store) => (
              <li key={store.id}>{store.shopDomain}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
