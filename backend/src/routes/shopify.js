import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();
const router = express.Router();

const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_SCOPES,
  SHOPIFY_REDIRECT_URI, // e.g. "https://yourdomain.com/api/shopify/callback"
} = process.env;

// Step 1: Redirect to Shopify for install
router.get("/install", (req, res) => {
  const shop = req.query.shop;
  if (!shop) return res.status(400).send("Missing shop param");

  const state = crypto.randomBytes(8).toString("hex");
  const installUrl =
    `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}` +
    `&scope=${SHOPIFY_SCOPES}` +
    `&redirect_uri=${SHOPIFY_REDIRECT_URI}` +
    `&state=${state}`;

  res.redirect(installUrl);
});

// Step 2: Callback from Shopify → exchange code for token
router.get("/callback", async (req, res) => {
  const { shop, code } = req.query;
  if (!shop || !code) return res.status(400).send("Missing shop or code");

  try {
    const tokenResponse = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: SHOPIFY_API_KEY,
        client_secret: SHOPIFY_API_SECRET,
        code,
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // TODO: Save shop + accessToken into your DB (linked to user)
    console.log("✅ Shopify store connected:", shop, accessToken);

    res.send("✅ Store connected successfully! You can now fetch data.");
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send("Failed to authenticate with Shopify");
  }
});

export default router;
