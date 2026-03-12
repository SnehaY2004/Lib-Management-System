# Library Management System

A full-stack web application for managing library books: **client** (React + Vite) and **server** (Node.js + Express + MongoDB). Deploy the API on **Render** and the frontend on **GitHub** (or any static host).

## Project structure

```
lib/
├── client/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/     # API client
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── server/          # Backend (Express + MongoDB)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Features

- **Books**: Add, view, update, delete, and search (by title or author)
- **Book fields**: Title, Author, ISBN, Genre, Publisher, Year, Copies, Shelf, Type, Status
- **REST API**: Proper status codes, validation, error handling

## Local development

### 1. Server

```bash
cd server
cp .env.example .env
# Edit .env: set MONGODB_URI (e.g. mongodb://localhost:27017/library_db or MongoDB Atlas)
npm install
npm run dev
```

API runs at **http://localhost:8080**.

### 2. Client

```bash
cd client
npm install
npm run dev
```

App runs at **http://localhost:3000** and proxies API requests to the server.

### 3. Run both (optional)

From the project root, if you use the root `package.json`:

```bash
npm install
npm run dev
```

This starts the server and the client together.

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/books` | Add a book |
| GET | `/books` | List all books |
| GET | `/books/:id` | Get one book |
| PUT | `/books/:id` | Update book |
| DELETE | `/books/:id` | Delete book |
| GET | `/books/search?title=...&author=...` | Search books |

## Deploy on GitHub

1. Create a new repo on GitHub.
2. From the project root:

```bash
git init
git add .
git commit -m "Initial commit: Library Management System"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## Deploy backend on Render

1. Create a database at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and copy the connection string.
2. On [Render](https://render.com): **New** → **Web Service**, connect your GitHub repo.
3. Set **Root Directory** to `server`.
4. **Build**: `npm install`  
   **Start**: `npm start`
5. Add env var: `MONGODB_URI` = your Atlas connection string.
6. Deploy. Note the URL (e.g. `https://library-api-xxx.onrender.com`).

## Deploy frontend (static)

After the API is on Render, point the client at it:

1. In `client`, create `.env.production` (or set in your host’s env):
   ```env
   VITE_API_URL=https://your-render-api-url.onrender.com
   ```
2. Build: `cd client && npm run build`
3. Deploy the `client/dist` folder to **Vercel**, **Netlify**, **GitHub Pages**, or any static host.

For **Render** static site: **New** → **Static Site**, root directory `client`, build `npm install && npm run build`, publish directory `dist`.

## Tech stack

- **Client**: React 18, Vite
- **Server**: Node.js, Express, Mongoose, MongoDB, CORS, dotenv

## License

ISC
