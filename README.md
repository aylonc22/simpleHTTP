# SimpleHTTP

A minimal, educational HTTP server built from scratch using Node.js sockets — no frameworks, no shortcuts.

## 🚀 What is SimpleHTTP?

**simpleHTTP** is a lightweight web server written entirely using Node.js's low-level `net` module. It's designed for learning purposes — to understand how HTTP actually works under the hood.

You'll see:
- Raw TCP connections
- Manual parsing of HTTP requests
- Custom routing logic
- Serving static files
- Building JSON APIs
- And more

## 🧠 Why?

Most developers use tools like Express, Fastify, or Next.js without ever seeing how an HTTP server *really* works.

This project aims to:
- Teach the fundamentals of HTTP
- Build appreciation for what frameworks do
- Serve as a foundation for deeper backend learning

## 📦 Features

- Raw HTTP over TCP (no `http` module)
- Manual request parsing (GET/POST, headers, body)
- Custom routing system
- Serve static files from a `public/` folder
- JSON response support
- Simple status code handling
- Fully extensible

## 🔧 Getting Started

```bash
git clone https://github.com/aylonc22/simplehttp
cd simplehttp
node server.js
