- Start the server:
npm start
- The server will run on http://localhost:3000.
📂 Project Files- server.js → Main Express server file
- routes/productRoutes.js → Product resource routes
- middleware/logger.js → Request logging middleware
- middleware/auth.js → Authentication middleware
- middleware/validateProduct.js → Validation middleware
- middleware/errors.js → Custom error classes + global error handler
- .env.example → Example environment variables
- Week2-Assignment.md → Assignment instructions
📦 API Endpoints1. Get all productsGET /api/products
- Supports query parameters: search, category, inStock, page, limit
Example RequestGET /api/products?search=laptop&category=electronics&page=1&limit=2
Example Response{
  "page": 1,
  "limit": 2,
  "total": 3,
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ]
}
2. Get product by IDGET /api/products/:id
Example RequestGET /api/products/1
Example Response{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
3. Create a new productPOST /api/products
- Requires Authorization header: Authorization: secret123
Example Requestcurl -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-H "Authorization: secret123" \
-d '{"name":"Tablet","description":"10-inch tablet","price":300,"category":"electronics","inStock":true}'
Example Response{
  "id": "generated-uuid",
  "name": "Tablet",
  "description": "10-inch tablet",
  "price": 300,
  "category": "electronics",
  "inStock": true
}
4. Update a productPUT /api/products/:id
- Requires Authorization header
Example Requestcurl -X PUT http://localhost:3000/api/products/1 \
-H "Content-Type: application/json" \
-H "Authorization: secret123" \
-d '{"name":"Gaming Laptop","description":"Updated specs","price":1500,"category":"electronics","inStock":true}'
Example Response{
  "id": "1",
  "name": "Gaming Laptop",
  "description": "Updated specs",
  "price": 1500,
  "category": "electronics",
  "inStock": true
}
5. Delete a productDELETE /api/products/:id
- Requires Authorization header
Example Requestcurl -X DELETE http://localhost:3000/api/products/1 \
-H "Authorization: secret123"
Example Response{
  "message": "Product deleted",
  "product": {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
}
🛡️ Middleware Implemented- Logger → Logs request method, URL, and timestamp
- Authentication → Checks for API key in Authorization header
- Validation → Ensures product data is complete and valid
- Error Handling → Global error handler + custom error classes (NotFoundError, ValidationError)
⚙️ Environment VariablesSee .env.example:PORT=3000
AUTH_TOKEN=secret123
🧪 Expected Outcome- Fully functional Express.js API with CRUD routes
- Middleware for logging, authentication, and validation
- Comprehensive error handling with proper status codes
- Advanced features: filtering, pagination, search
- Ready for testing with Postman, Insomnia, or curl
