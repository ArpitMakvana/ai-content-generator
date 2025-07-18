# AI Content Generator (NestJS + OpenAI + DALL·E + Pexels)

This is an API-based content generation project built with **NestJS**, utilizing:
- **OpenAI GPT** for text generation (e.g., GPT-3.5-turbo or GPT-4-turbo)
- **DALL·E** for image generation
- **Pexels API** for video content
- **MongoDB** for data persistence

---

## 🚀 Features

- Generate blog-style text content using OpenAI
- Fetch relevant images using OpenAI's DALL·E API
- Fetch relevant videos using the Pexels video API
- Saves content, images, and videos to MongoDB
- Gracefully handles errors and returns partial success if any API fails

---

## 🛠️ Technologies Used

- NestJS
- RxJS
- MongoDB (Mongoose)
- OpenAI API (GPT + DALL·E)
- Pexels API
- Postman Collection Included

---

## 📦 Installation

```bash
git clone https://github.com/YOUR_USERNAME/ai-content-generator.git
cd ai-content-generator
npm install
```

---

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_key_here
PEXELS_API_KEY=your_pexels_key_here
MONGO_URI=mongodb://localhost:27017/ai-content
PORT=3000
```

---

## 📡 Running the App

```bash
npm run start:dev
```

API will be available at: `http://localhost:3000`

---
## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📬 API Usage

**Endpoint:**
```
POST /content
```

**Body:**
```json
{
  "topic": "AI in Healthcare"
}
```

**Response:**
```json
{
  "topic": "AI in Healthcare",
  "text": "...",
  "imageUrls": ["..."],
  "videoUrls": ["..."]
}
```

If image or video fails, `imageUrls` or `videoUrls` will be an empty array.

---

## 🧪 Postman Collection

Postman collection is included as `postman_collection.json`.

---

## 🔐 Git Configuration

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## 📄 .gitignore Sample

```gitignore
node_modules
dist
.env
*.log
```

---

## 🤝 Contributing

PRs are welcome! Feel free to fork and extend the functionality (e.g., add more APIs).

---

## Stay in touch

- Author - [Arpit Makvana](https://github.com/ArpitMakvana)


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
