// frontend/src/components/AddStore.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function AddStore({ onStoreAdded }) {
  const [form, setForm] = useState({
    shopDomain: '',
    accessToken: '',
    apiVersion: '2025-07',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5002/api/stores', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onStoreAdded(res.data.store);
      alert('Store added successfully!');
      setForm({ shopDomain: '', accessToken: '', apiVersion: '2025-07' });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to add store');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h3 className="text-xl font-bold mb-4">Add Shopify Store</h3>
      <input
        type="text"
        name="shopDomain"
        placeholder="Shop Domain (example.myshopify.com)"
        value={form.shopDomain}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="text"
        name="accessToken"
        placeholder="Access Token"
        value={form.accessToken}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Store'}
      </button>
    </div>
  );
}
