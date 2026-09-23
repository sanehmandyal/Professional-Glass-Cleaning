# Professional Glass Cleaning Service — Production MERN Stack Platform

A high-performance, responsive, SEO-optimized MERN stack platform engineered for **Professional Glass Cleaning Service**, headquartered in Green Enclave, Zirakpur, Punjab 140603, India.

---

## 🏢 Verified Business Information

| Property | Details |
| :--- | :--- |
| **Business Trade Name** | **Professional Glass Cleaning Service** |
| **Primary Verified Phone** | **`+91 8539842072`** / **`8539842072`** |
| **WhatsApp Business Line** | **`+91 8539842072`** ([wa.me/918539842072](https://wa.me/918539842072)) |
| **Operating Base Address** | **Green Enclave, Zirakpur, Punjab 140603, India** |
| **Primary Service Coverage** | **Zirakpur, Mohali (SAS Nagar), Chandigarh (Tricity), & Selected Punjab Regions** |
| **Business Working Hours** | **Monday – Sunday: 8:00 AM – 8:00 PM** (Emergency requests attended) |

---

## 💎 Design System & Visual Identity

The interface features an **Apple-level cleanliness** aesthetic paired with modern **SaaS glassmorphism**:
- **Color Palette**: Deep Navy (`#0B1F33`), Vibrant Blue (`#1677FF`), Sky Cyan (`#38BDF8`), Light Blue tint (`#EAF6FF`), Pure White (`#FFFFFF`), Soft Gray (`#F5F8FC`), and Dark Text (`#102033`).
- **Glassmorphism Primitives**: Translucent panels (`backdrop-blur-xl`), subtle 1px specular border glows, reflective shine overlays, and soft elevation shadows.
- **Custom Brand Identity**: SVG Logo blending architectural window panes, 4-point cleaning sparkles, light refraction, and water droplets.
- **Mobile Sticky CTA Bar**: Fixed bottom quick-action bar (`CALL`, `WHATSAPP`, `GET QUOTE`) with touch-friendly safe-area padding.

---

## 🛠️ Complete Technology Stack

### Frontend (`client/`)
- **Core**: React 18, Vite 5, React Router v6
- **Styling**: Tailwind CSS v3 with custom glassmorphism design tokens
- **SEO & Meta**: `react-helmet-async` for dynamic Head tags, canonical links, Open Graph, and JSON-LD schema
- **Icons**: Lucide React
- **HTTP Client**: Axios with centralized authorization interceptors

### Backend (`server/`)
- **Runtime**: Node.js & Express.js (REST API)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) & `bcryptjs` password hashing
- **Security Middleware**: `helmet` security headers, `cors`, `express-rate-limit` (brute force & spam protection), `express-mongo-sanitize` (NoSQL injection prevention), `express-validator` (strict payload validation)
- **Logging**: Morgan

---

## 📋 Comprehensive Service Catalog (14 Dedicated Pages)

Every service page is individually crafted with problem diagnosis, advantages, step-by-step procedures, property suitability, FAQs, and local service routes:

1. **Professional Glass Cleaning** (`/services/glass-cleaning`)
2. **SGPC Repairing** (`/services/sgpc-repairing`) — *Preserved exact official terminology*
3. **Silicone Repair** (`/services/silicone-repair`)
4. **Glass Repair** (`/services/glass-repair`)
5. **Water Tank Cleaning** (`/services/water-tank-cleaning`)
6. **Window Glass Cleaning** (`/services/window-glass-cleaning`)
7. **Glass Door Cleaning** (`/services/glass-door-cleaning`)
8. **Residential Glass Cleaning** (`/services/residential-glass-cleaning`)
9. **Commercial Glass Cleaning** (`/services/commercial-glass-cleaning`)
10. **Office Glass Cleaning** (`/services/office-glass-cleaning`)
11. **Shop/Showroom Glass Cleaning** (`/services/shop-glass-cleaning`)
12. **Glass Maintenance** (`/services/glass-maintenance`)
13. **Silicone Sealing / Replacement** (`/services/silicone-sealing`)
14. **Emergency Glass Repair** (`/services/emergency-glass-repair`)

---

## 📍 Local SEO Location Architecture

### 1. Primary Location Hubs
- **Zirakpur Base** (`/locations/zirakpur`): Headquartered at Green Enclave with dedicated coverage of VIP Road, High Ground, Maya Garden, Baltana, and Peer Muchalla.
- **Mohali Hub** (`/locations/mohali`): Comprehensive coverage across Phases 1 to 11, Sectors 66 to 82, IT City, and Aerocity.
- **Chandigarh Hub** (`/locations/chandigarh`): Serving commercial showrooms in Sectors 17, 22, 35, Industrial Area, and residential kothis across Sectors 1 to 60.
- **Punjab Coverage Region** (`/locations/punjab`): Selected areas of Punjab served by advance scheduling.

### 2. Scalable Location + Service Landing Pages
- `/zirakpur/glass-cleaning`
- `/zirakpur/glass-repair`
- `/zirakpur/silicone-repair`
- `/zirakpur/water-tank-cleaning`
- `/zirakpur/sgpc-repairing`
- `/mohali/glass-cleaning`
- `/mohali/glass-repair`
- `/mohali/silicone-repair`
- `/mohali/water-tank-cleaning`
- `/chandigarh/glass-cleaning`
- `/chandigarh/glass-repair`
- `/chandigarh/silicone-repair`
- `/chandigarh/water-tank-cleaning`

---

## 🔍 Google Search Console & Schema.org (JSON-LD)

The platform embeds rich, verified JSON-LD structured data on all pages without fabricated claims or fake ratings:
- **`LocalBusiness` (HomeAndConstructionBusiness)**: Verified NAP, coordinates, service area, and Google Maps URL.
- **`BreadcrumbList`**: Hierarchical breadcrumb navigation markup.
- **`Service`**: Entity schema for individual service pages.
- **`FAQPage`**: Search snippet markup for FAQ accordions.
- **`sitemap.xml`**: Auto-generated XML sitemap referencing all public pages and landing combinations.
- **`robots.txt`**: Production crawler directives disallowing `/admin`, `/api`, `/login`.

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- **Node.js** v18+ and **npm** v9+
- **MongoDB** (Local instance or free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

### 2. Backend Setup
```bash
cd server
cp .env.example .env
# Edit server/.env with your MONGO_URI and JWT_SECRET
npm install
npm run seed      # Seeds admin account, 14 services, locations, FAQs, and SEO data
npm run dev       # Starts Express API on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
cp .env.example .env
# Ensure VITE_API_URL=http://localhost:5000/api
npm install
npm run dev       # Starts Vite dev server on http://localhost:5173
```

### 4. Admin Credentials (Seeded by Default)
- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@professionalglasscleaning.com`
- **Password**: `Admin@123456`

---

## 🛡️ Admin Dashboard Management Modules

From the `/admin` portal, administrators have full control over:
1. **Customer Reviews Moderation (`/admin/reviews`)**: Review incoming customer feedback, approve genuine ratings for live display, toggle homepage featured status, reply to customer comments, or delete spam.
2. **Enquiries & Leads Pipeline (`/admin/enquiries`)**: Filter by `Pending`, `Contacted`, `Confirmed`, `Completed`, `Cancelled`, with one-click direct Call and WhatsApp shortcuts.
3. **Services CRUD (`/admin/services`)**: Add, edit, or toggle services, benefits, and execution steps.
4. **Service Areas (`/admin/locations`)**: Manage local coverage areas and SEO descriptions.
5. **FAQ Knowledgebase (`/admin/faqs`)**: Manage customer questions with categorization.
6. **SEO Settings (`/admin/seo`)**: Per-page custom title tags, meta descriptions, canonical URLs, and Open Graph previews.
7. **Business Information (`/admin/business-info`)**: Update business phone (`8539842072`), address, WhatsApp line, and map URLs.

---

## 🌐 Production Deployment

### Frontend (`client/`) → Vercel
1. Import repository on Vercel with **Root Directory** set to `client`.
2. Configure Environment Variable: `VITE_API_URL=https://your-backend-api.onrender.com/api`.
3. `vercel.json` ensures all client-side React Router paths redirect seamlessly to `index.html`.

### Backend (`server/`) → Render
1. Deploy as a **Web Service** on Render using `server/render.yaml` or manual setup.
2. Configure Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A long secure random string.
   - `CLIENT_URL`: Your deployed Vercel frontend URL (e.g. `https://professionalglasscleaningservice.com`).
3. Run `npm run seed` once from Render Shell or locally against the Atlas cluster.

---

## 📞 Support & Contacts

For service inquiries or technical assistance:
- **Phone**: `+91 8539842072`
- **WhatsApp**: `+91 8539842072`
- **Location**: Green Enclave, Zirakpur, Punjab 140603, India
