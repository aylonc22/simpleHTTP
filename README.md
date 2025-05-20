# SimpleHTTP

A minimal, educational HTTP server built from scratch using Node.js sockets — no frameworks, no shortcuts.

---

## 🚀 What is SimpleHTTP?

**SimpleHTTP** is a lightweight web server implemented entirely with Node.js's low-level `net` module (not `http`). It's designed as a learning project to expose the raw mechanics of HTTP — from TCP connections to full routing and middleware support.

You’ll explore:
- TCP socket handling and raw data parsing
- Manual construction of HTTP requests and responses
- A full middleware system (Express-style)
- Static file serving, JSON APIs, form handling
- Rate limiting, CORS, redirect logic, and more

---

## 🧠 Why Build This?

Most developers use Express, Fastify, or Next.js without ever seeing what an HTTP server **actually** does under the hood.

This project was built to:
- Learn the **fundamentals of HTTP and TCP**
- Develop appreciation for what web frameworks abstract away
- Build a base for deeper backend engineering skills
- Gain experience writing extensible, testable server logic from scratch

---

## 📦 Features

✅ Built from scratch with `net.createServer()`  
✅ Custom HTTP request parser (method, path, headers, body)  
✅ Express-style `app.get()`, `app.post()` routing  
✅ Middleware system (`app.use()`) with `next()` support  
✅ Serve static files from a `public/` folder  
✅ Handle forms, redirects, and content types  
✅ CORS middleware  
✅ Rate limiting middleware  
✅ Detailed and isolated unit tests for every module  
✅ Custom logging with `-v` verbose mode

---

## 🔧 Getting Started

```bash
git clone https://github.com/aylonc22/simplehttp
cd simplehttp
node index.js
