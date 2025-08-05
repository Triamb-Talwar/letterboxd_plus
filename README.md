
# 🎬 Letterboxd+ — Your Ultimate Media Tracker

A beautiful and powerful media tracker inspired by Letterboxd — track movies, TV shows, games, and more. Built with React and Firebase, deployed on Netlify.

🌐 [Live Demo](https://letterboxplus.netlify.app)

📸 Preview Coming Soon!

---

## 🚀 Features

- 🔐 Firebase Auth (Google Sign-In)
- 📽 TMDB Integration for Movie/TV Metadata
- 🎮 RAWG & TVMaze APIs for Games and Shows
- 📝 Custom Lists with Ratings & Reviews
- 👥 Public Profiles with Shareable URLs
- 📋 Save, Edit & Manage Media Lists
- ☁️ Local Storage Support
- ✨ Responsive Design

---

## ⚙️ Environment Variables

Create a `.env` file in your root directory with the following:

```env
REACT_APP_TMBD_API_KEY=your_tmdb_key
REACT_APP_TMBD_ACESS_TOKEN=your_access_token
REACT_APP_RAWG_API_KEY=your_rawg_key

REACT_APP_TVMAZE_API_KEY=your_tvmaze_key
REACT_APP_TRAKT_CLIENT_ID=your_trakt_id

REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

🔐 These keys are safe to expose in frontend apps, but **make sure to lock down your Firestore rules** for security.

---

## 🤝 Contributing

Contributions welcome! Here's how to get started:

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request 🙌

---

## 👥 Contributors

- Triamb Talwar — creator 💡
- You? Add your name here via a PR!

---


## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
