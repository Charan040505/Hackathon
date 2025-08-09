# Inventory Management Dashboard (IMD)

[![Frontend](https://img.shields.io/badge/Frontend-Vercel-blue?style=for-the-badge&logo=vercel)](https://imd-khaki.vercel.app)  
[![Backend](https://img.shields.io/badge/Backend-Render-orange?style=for-the-badge&logo=render)](https://imd-1.onrender.com)

## Live Demo

- **Frontend (Vercel):**  
  [https://imd-khaki.vercel.app](https://imd-khaki.vercel.app)

- **Backend API (Render):**  
  [https://imd-1.onrender.com](https://imd-1.onrender.com)

## Description

Inventory Management Dashboard is a full-stack web application that helps users manage suppliers, items, and logs efficiently. Key features include:

- Add, update, delete, and search items  
- Supplier management  
- Action logs with timestamps  
- QR code generation and scanning  
- Import/export item data in CSV format  

## Technologies Used

- **Frontend:** HTML,CSS,JS (hosted on Vercel)  
- **Backend:** Node.js, Express.js (hosted on Render)  
- **Database:** MongoDB Atlas  
- **Other:** Multer, QRCode, Twilio, CORS  

## Installation

### Clone the repository

```bash
git clone https://github.com/Charan040505/IMD.git
cd IMD
npm install
```

### Environment Variables

Create a `.env` file in the root (backend) folder and add your environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## Usage

### Running Backend Locally

```bash
node server.js
```

*Make sure your MongoDB URI and other env variables are correctly set.*

### Running Frontend Locally

If your frontend is in a separate folder (e.g., `/client`), navigate there and run:

```bash
cd frontend
npx serve . -p 3000
```

---

## Deployment

- **Frontend** is deployed on [Vercel](https://imd-khaki.vercel.app)  
- **Backend API** is deployed on [Render](https://imd-1.onrender.com)  

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## Contact

Created by Charan040505  
GitHub: [https://github.com/Charan040505](https://github.com/Charan040505)

---

*Thank you for checking out this project!*# Inventory Management Dashboard
