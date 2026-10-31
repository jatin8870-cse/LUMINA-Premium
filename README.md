# LUMINA-Premium
Full Stack MERN Application

## Local setup

1. Install MongoDB Server. On Windows PowerShell:

   ```powershell
   winget install --id MongoDB.Server --source winget --accept-package-agreements --accept-source-agreements
   ```

2. Open a new Administrator PowerShell and start MongoDB:

   ```powershell
   Start-Service MongoDB
   ```

   If the service name differs, find it with:

   ```powershell
   Get-Service *mongo*
   ```

   Confirm that port `27017` is listening before continuing.
3. Run `cd backend`, `npm install`, `npm run seed`, then `npm run dev`.
4. Run `cd frontend`, `npm install`, then `npm run dev`.

Seeded admin: `admin@lumina.local` / `Admin@123`. Coupons: `WELCOME10` and `LUMINA200`.

The API is under `/api`: authentication (`/auth`), products (`/products`), server cart (`/cart`), coupon validation (`/coupons/validate`), orders/invoices (`/orders`), demo payment (`/payment/demo-pay`), admin operations (`/admin`), and public banners (`/banners`). JSON responses use `{ success, data, message }`.

Payment is simulated in `backend/src/controllers/orders.js`; email logs are in `backend/src/utils/mailer.js`; local uploads are handled by `backend/src/middleware/upload.js`. Replace those files/functions later for Razorpay, SMTP, and Cloudinary respectively. Existing frontend dummy products and image URLs remain intact as fallbacks.
