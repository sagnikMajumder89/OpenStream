# 🎬 OpenStream

A modern video streaming platform built with **Next.js**, **Tailwind CSS**, and **ShadCN UI** to showcase frontend skills and clean component design. This project was created as part of a portfolio to demonstrate UI/UX, API integration, and dynamic theming (dark/light mode) for video-based apps.

---

## 🚀 Features

- 🌗 **Dark/Light mode toggle** using `next-themes` and ShadCN
- 🎥 **Trending videos UI** (Movies and Series)
- ⚙️ Custom **API route** for mock data fetching
- 🔄 Loading indicator with fallback state
- 💅 Fully responsive UI using **Tailwind CSS**
- 🧩 Componentized with **ShadCN Cards**, Headers, and Layouts
- 🌐 Remote image loading from any HTTPS domain via `next/image`

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [ShadCN](https://ui.shadcn.com)
- **Dark Mode**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Data Fetching**: Axios + Mock API via Next.js route handlers
- **Image Optimization**: Next.js Image component

---

## 🧪 Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/sagnikMajumder89/OpenStream.git
   cd OpenStream
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` to view in browser.

---

## 🔗 API Reference

### `/api/trendings?type=series|movies`

Returns trending mock data for series or movies.

Example:

```bash
GET /api/trendings?type=series
```

---

## 🌍 Deployment

You can deploy this project easily using:

- **[Vercel](https://vercel.com)** (Recommended for Next.js)
- **Netlify** (with Next.js plugin)
- **Render**
- **VPS**

---

## 📜 License

MIT License. Free for personal and educational use.

---

## 🙋‍♂️ Author

**Sagnik Majumder**  
[GitHub](https://github.com/sagnikMajumder89) • [Portfolio](https://chessmate.bytebuilderz.xyz/developer)
