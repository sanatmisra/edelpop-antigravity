# Deployment Guide: Edelpop Storefront

To deploy your "Edelpop" storefront for free and ensure the checkout works in production, follow these simple steps using **Vercel**.

## 1. Prepare your Repository
Make sure all your latest changes (including the checkout fix) are pushed to your GitHub repository.

```bash
git add .
git commit -m "feat: implement shopify checkout"
git push origin main
```

## 2. Deploy to Vercel
1.  Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
2.  Click **"Add New"** > **"Project"**.
3.  Import your `edelpop-antigravity` repository.
4.  **Crucial Step: Environment Variables**
    Before clicking **Deploy**, expand the **Environment Variables** section and add the following keys from your `.env` file:
    *   `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`: `<YOUR_SHOPIFY_STORE_DOMAIN>` (e.g., 01n1nx-bc.myshopify.com)
    *   `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`: `<YOUR_STOREFRONT_ACCESS_TOKEN>`
    *   `SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN`: `<YOUR_PRIVATE_ACCESS_TOKEN>`

5.  Click **Deploy**.

## 3. Post-Deployment Verification
Once the deployment is finished, Vercel will provide you with a production URL (e.g., `https://edelpop-store.vercel.app`).
1.  Visit the live site.
2.  Add a product to your cart.
3.  Click **"Checkout via Shopify"**.
4.  Verify that you are redirected to the secure Shopify checkout page.

---

### Why Vercel?
- **Free Tier**: Includes infinite deployments, automatic SSL, and global CDN.
- **Next.js Native**: Since you are using Next.js 15, Vercel provides the fastest performance and best support for features like Server Actions (which we use for the checkout).
- **Easy Updates**: Every time you push to GitHub, Vercel will automatically redeploy your site.

### Important Note
**Shopify Domain**: Ensure your Shopify store is not in "Maintenance Mode" or password-protected if you want public users to access the checkout.
