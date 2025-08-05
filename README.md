# 🎬 Letterboxd Plus

A sleek, minimalist media tracker built with React + Firebase + TMDB API.  
Create, review, and share your custom media lists – from movies to games and everything in between.

🚀 **Live Demo:** [letterboxplus.netlify.app](https://letterboxplus.netlify.app)



## 🧰 Tech Stack

- **Frontend:** React (Vite)
- **Backend / Auth:** Firebase (Google Sign-In)
- **Database:** Firestore
- **Media Data:** TMDB API
- **Deployment:** Netlify

---

## 🔐 Security Notice

> ⚠️ **Warning:** The project uses Firebase client SDK and includes your public Firebase API key.  
This key is safe to expose as it doesn't grant admin access, but for production apps, ensure Firestore rules are **strict** to avoid misuse.

---

## 📦 Features

- 🔐 Google Sign-In via Firebase Auth
- 🗂 Create & manage custom media lists
- 🎞 Add movies, shows, or games via TMDB
- ⭐ Add reviews & ratings
- 🌐 Share public profiles with unique URLs (`/user/username`)
- 🖼 Dynamic media previews with portrait/landscape support

---



## 🧪 Run Locally

```bash
git clone https://github.com/Triamb-Talwar/letterboxd_plus.git
cd letterboxd_plus
npm install
npm run dev
