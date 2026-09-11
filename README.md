# Study Universe - Free Education Platform

100% Free courses, video lectures and PDFs. Made for students.

## Features
- 📚 Courses management
- 🎥 YouTube + Firebase Storage video player
- 📄 PDF viewer + download
- 🔐 Firebase Auth + Admin protection
- ⚡ Vercel deploy ready (SPA rewrite)
- 📱 Mobile friendly

## Setup Steps (Hindi)

### 1. Firebase Project Banao
1. firebase.google.com par jao
2. New Project > Study Universe naam do
3. Authentication > Email/Password enable karo
4. Firestore Database > Create > Test mode
5. Storage > Create > Test mode
6. Project Settings > Config copy karo

### 2. GitHub Repo Banao
1. GitHub par naya repo banao: study-universe
2. Is code viewer se har file copy karke repo me paste karo (same folder structure)
3. .env file banao aur .env.example se values bharke Firebase config daalo
4. Commit & Push

### 3. Vercel Pe Deploy Karo
1. vercel.com > Add New Project > GitHub repo import karo
2. Environment Variables me .env wali 7 values add karo
3. Deploy click karo
4. Done! Aapki site live hai

### 4. Admin User Banao
- Firebase Console > Authentication > Add User > admin@studyuniverse.com + password
- .env me VITE_ADMIN_EMAIL wahi email daalo
- Login karke /admin se content add karo

## Folder Structure
- public/manifest.json
- src/firebase.js
- src/context/AuthContext.jsx
- src/components/Navbar.jsx
- src/pages/* (6 pages)

## Firebase Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Support
Koi issue ho to GitHub Issues me pucho.
