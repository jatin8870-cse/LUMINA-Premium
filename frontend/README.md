# LUMINA — Premium Skincare Storefront (Frontend)

Responsive React + Vite + Tailwind storefront with a warm, editorial luxury direction.

## Included
- Home / brand story / featured products
- Shop collection with category filters and price sorting
- Product detail pages
- Cart persisted in localStorage
- Checkout form and Razorpay frontend hand-off
- Admin overview, products and order status UI
- Demo product catalogue when the backend is unavailable

## Run locally
```bash
cd lumina-frontend
npm install
cp .env.example .env
npm run dev
```
Open http://localhost:5173

## Backend connection
Set `VITE_API_URL` in `.env` (default `http://localhost:5000/api`). The storefront expects:
- `GET /products` → array or `{ products: [] }`
- `POST /orders` → create order and return Razorpay `key`, `razorpayOrderId`, `amount`, `currency` (or compatible fields)
- `POST /orders/verify-payment` → verify Razorpay signature and mark order paid
- `GET /admin/orders`
- `GET /admin/products`
- `POST /admin/products`
- `PATCH /admin/orders/:id`

The exact API contract must match your Express routes. Your supplied backend snippet only mounts route files; it does not yet define these endpoint contracts.

## Razorpay
Add the official Razorpay checkout script to `index.html` before `</body>`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```
Set `VITE_RAZORPAY_KEY` to a test key. The backend must create Razorpay orders and verify payment signatures using the secret key. Never put the Razorpay secret in frontend environment variables.

## Admin access
For this starter UI, put a valid backend admin JWT in browser localStorage as `lumina-admin-token` (or `lumina-token`). Implement real admin login/role checks in your backend before production. This is not a substitute for server-side authorization.

## Production checklist
- Add authentication/login and protected admin routes.
- Confirm API payloads and status values match the backend.
- Verify payment signature on the server before confirming an order.
- Add address validation, loading/error states, order confirmation email and tracking.
- Replace demo copy/images with approved brand assets and product claims.
- Configure CORS and environment variables for deployment.
