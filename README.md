# 🎬 Letterboxd+

Your personalized media tracker — built with React, Firebase Auth, and TMDB API. Track movies, create custom lists, write reviews, and share your profile with others.

🌐 **Live Demo:** [letterboxplus.netlify.app](https://letterboxplus.netlify.app)

## 🚀 Features

- 🔍 Search and explore movies using TMDB API
- 🧾 Create custom watchlists and favorites
- ✍️ Add ratings and reviews
- 👥 Public profiles to view other users’ lists
- 🔐 Firebase Google Auth
- 💾 LocalStorage + Firebase-ready structure for persistent data

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following:

```env
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_TMDB_API_KEY=your_tmdb_key
```

> 🔐 These keys are safe to expose in frontend apps, but **secure your Firestore rules** to prevent misuse!

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. **Fork** the repository
2. **Create a new branch** (`git checkout -b feature-name`)
3. Make your changes 💻
4. **Submit a pull request** 🙌

---

## 👥 Contributors

- **Triamb Talwar** — [GitHub](https://github.com/Triamb-Talwar) 💡  
- You? Add yourself via a PR!

---


## 📄 License

[MIT License](LICENSE)
