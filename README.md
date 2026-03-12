# Store Inventory Management Backend API

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)** to manage a retail store's products and inventory.

---

## 🛠 Tech Stack

- **Node.js** — Runtime
- **Express.js** — Web framework
- **MongoDB + Mongoose** — Database + ODM
- **dotenv** — Environment variable management
- **cors** — Cross-Origin Resource Sharing

---

## 📁 Project Structure

```
store-management-backend/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   └── productController.js # Business logic for all endpoints
├── middleware/
│   └── errorHandler.js      # Global error handling middleware
├── models/
│   └── Product.js           # Mongoose schema & validations
├── routes/
│   └── productRoutes.js     # All API route definitions
├── .env                     # Environment variables (not committed)
├── .gitignore
├── package.json
└── server.js                # Entry point
```

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd store-management-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/storeDB?retryWrites=true&w=majority
   ```

4. **Start the server:**
   ```bash
   # Development (with auto-reload)
   npm run dev

   # Production
   npm start
   ```

---

## 📦 Product Schema

| Field            | Type    | Required | Validation                          |
|------------------|---------|----------|-------------------------------------|
| productName      | String  | ✅       | Required                            |
| productCode      | String  | ✅       | Required, Unique                    |
| category         | String  | ✅       | Electronics/Clothing/Food/Furniture/Other |
| supplierName     | String  | ✅       | Required                            |
| quantityInStock  | Number  | ✅       | Non-negative (≥ 0)                  |
| reorderLevel     | Number  | ✅       | Greater than 0 (≥ 1)               |
| unitPrice        | Number  | ✅       | Positive value (≥ 0.01)            |
| manufactureDate  | Date    | ❌       | Optional                            |
| productType      | String  | ✅       | Perishable / Non-Perishable         |
| status           | String  | ❌       | Available / Out of Stock (default: Available) |

---

## 🔌 API Endpoints

| Method | Endpoint                       | Description               | Status Code |
|--------|-------------------------------|---------------------------|-------------|
| POST   | `/products`                   | Add a new product         | 201 Created |
| GET    | `/products`                   | Get all products          | 200 OK      |
| GET    | `/products/:id`               | Get product by ID         | 200 / 404   |
| PUT    | `/products/:id`               | Update product details    | 200 / 404   |
| DELETE | `/products/:id`               | Delete a product          | 200 / 404   |
| GET    | `/products/search?name=xyz`   | Search product by name    | 200 OK      |
| GET    | `/products/category?cat=xyz`  | Filter products by category | 200 OK    |

---

## 📋 HTTP Status Codes Used

| Code | Meaning       |
|------|---------------|
| 200  | Success       |
| 201  | Created       |
| 400  | Bad Request   |
| 404  | Not Found     |
| 500  | Server Error  |

---

## 🚀 Deployment

- **GitHub:** [Repository Link]
- **Render:** [Live API URL]

---

## 📝 Example Request Body (POST /products)

```json
{
  "productName": "Samsung Galaxy S24",
  "productCode": "ELEC-001",
  "category": "Electronics",
  "supplierName": "Samsung India Pvt Ltd",
  "quantityInStock": 50,
  "reorderLevel": 10,
  "unitPrice": 79999.99,
  "manufactureDate": "2024-01-15",
  "productType": "Non-Perishable",
  "status": "Available"
}
```
