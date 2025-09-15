import fetch from 'node-fetch';
import { prisma } from './prisma.js';

// Helper to call Shopify API
async function fetchShopifyData(shopDomain, accessToken, resource) {
  const url = `https://${shopDomain}/admin/api/${process.env.SHOPIFY_API_VERSION}/${resource}.json`;
  const res = await fetch(url, {
    headers: { 'X-Shopify-Access-Token': accessToken },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify API error: ${text}`);
  }

  return res.json();
}

// Main function to add a store
export async function addStoreForUser(userId, shopDomain, accessToken, scopes) {
  // 1️⃣ Validate user
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  // 2️⃣ Validate Shopify URL + token
  try {
    await fetchShopifyData(shopDomain, accessToken, 'shop');
  } catch {
    throw new Error('Invalid Shopify URL or access token');
  }

  // 3️⃣ Check if store already exists
  const existing = await prisma.store.findUnique({ where: { shopDomain } });
  if (existing) throw new Error('Store already exists');

  // 4️⃣ Create store
  const store = await prisma.store.create({
    data: {
      tenantId: user.tenantId,
      shopDomain,
      accessToken,
      apiVersion: process.env.SHOPIFY_API_VERSION || '2025-07',
      scopes: scopes || 'read_products,read_orders,read_customers',
    },
  });

  // 5️⃣ Optionally fetch products/customers/orders
  try {
    const [productsData, customersData, ordersData] = await Promise.all([
      fetchShopifyData(shopDomain, accessToken, 'products'),
      fetchShopifyData(shopDomain, accessToken, 'customers'),
      fetchShopifyData(shopDomain, accessToken, 'orders'),
    ]);

    // Save products
    for (const p of productsData.products || []) {
      await prisma.product.create({
        data: {
          tenantId: user.tenantId,
          storeId: store.id,
          shopifyId: p.id.toString(),
          title: p.title,
          vendor: p.vendor,
          productType: p.product_type,
          status: p.status,
          totalInventory: p.variants?.reduce((sum, v) => sum + (v.inventory_quantity || 0), 0) || 0,
          priceMin: p.variants?.[0]?.price,
          priceMax: p.variants?.[0]?.price,
        },
      });
    }

    // Save customers
    for (const c of customersData.customers || []) {
      await prisma.customer.create({
        data: {
          tenantId: user.tenantId,
          storeId: store.id,
          shopifyId: c.id.toString(),
          email: c.email,
          firstName: c.first_name,
          lastName: c.last_name,
          phone: c.phone,
          numberOfOrders: c.orders_count,
          totalSpent: c.total_spent,
        },
      });
    }

    // Save orders
    for (const o of ordersData.orders || []) {
      await prisma.order.create({
        data: {
          tenantId: user.tenantId,
          storeId: store.id,
          shopifyId: o.id.toString(),
          name: o.name,
          processedAt: o.processed_at ? new Date(o.processed_at) : null,
          currency: o.currency,
          subtotalPrice: o.subtotal_price,
          totalShipping: o.total_shipping_price_set?.shop_money?.amount,
          totalTax: o.total_tax,
          totalRefunded: o.total_refunds,
          currentTotalPrice: o.total_price,
          financialStatus: o.financial_status,
          fulfillmentStatus: o.fulfillment_status,
        },
      });
    }
  } catch (err) {
    console.warn('⚠ Failed to fetch Shopify data (products/customers/orders):', err.message);
  }

  return store;
}
