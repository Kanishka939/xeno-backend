import { addStoreForUser } from '../storeHelper.js';

export const addStoreHandler = async (req, res) => {
  const { shopDomain, accessToken, scopes } = req.body;

  // 1️⃣ Check authentication
  if (!req.userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    // 2️⃣ Add store (Shopify validation inside)
    const store = await addStoreForUser(req.userId, shopDomain, accessToken, scopes);

    // 3️⃣ Return created store
    res.status(201).json({ store });
  } catch (err) {
    console.error('❌ Failed to add store:', err.message);
    res.status(400).json({ message: err.message });
  }
};
