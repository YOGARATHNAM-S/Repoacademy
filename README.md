# 🧠 RepoAcademy

> Learn from GitHub's best repositories. Submit any public repo, get instant analysis with power scoring, difficulty levels, and engage in community discussions.

<div align="center">

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs)](https://nodejs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green)](#license)

[Live Demo](#-live-demo) • [Features](#-features) • [Setup](#-quick-start) • [API](#-api-reference) • [Contributing](#-contributing)

</div>

---

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h4>🔍 Smart Analysis</h4>
      <ul>
        <li>Instant GitHub repo analysis</li>
        <li>Power Score algorithm (0-100)</li>
        <li>3-tier difficulty classification</li>
        <li>Language & tech stack detection</li>
      </ul>
    </td>
    <td width="50%">
      <h4>💬 Community Engagement</h4>
      <ul>
        <li>Threaded discussions</li>
        <li>Nested comment replies</li>
        <li>Like & sort features</li>
        <li>Markdown support</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h4>📊 Rich Insights</h4>
      <ul>
        <li>Repository metadata</li>
        <li>README viewer</li>
        <li>Contributor metrics</li>
        <li>Topic categorization</li>
      </ul>
    </td>
    <td width="50%">
      <h4>🔐 Privacy First</h4>
      <ul>
        <li>No GitHub token needed</li>
        <li>Public API only</li>
        <li>60 req/hour rate limit</li>
        <li>Open source</li>
      </ul>
    </td>
  </tr>
</table>

---

## � Table of Contents

- [Live Demo](#-live-demo)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Power Score Formula](#-power-score-algorithm)
- [Tech Stack](#-tech-stack)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎮 Live Demo

🚀 **Coming soon!** Deploy to GitHub Pages or Vercel for live preview.

```
Frontend: http://localhost:5173
Backend:  http://localhost:5000
API Docs: http://localhost:5000/health
```

---

## 🚀 Quick Start

### Prerequisites

```bash
✓ Node.js 18+
✓ npm or yarn
✓ Supabase account (free tier available)
```

### Installation

<details open>
<summary><b>1️⃣ Backend Setup</b></summary>

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:5000`

</details>

<details open>
<summary><b>2️⃣ Frontend Setup</b></summary>

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`

</details>

### Environment Variables

Create `backend/.env`:
```env
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
```

---

## 📁 Project Structure

```
repolearn/
├── backend/
│   ├── 📂 config/
│   │   └── firebase.js              # Supabase client
│   ├── 📂 controllers/
│   │   ├── repoController.js       # Repo logic
│   │   └── commentController.js    # Comment logic
│   ├── 📂 routes/
│   │   ├── repoRoutes.js
│   │   └── commentRoutes.js
│   ├── 📂 services/
│   │   ├── repoService.js          # DB operations (Supabase)
│   │   ├── commentService.js       # DB operations (Supabase)
│   │   ├── githubService.js        # GitHub API client
│   │   └── powerScoreService.js    # Score calculation
│   ├── 📂 models/
│   │   ├── Repo.js                 # ⚠️ DEPRECATED
│   │   └── Comment.js              # ⚠️ DEPRECATED
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── 🎨 public/
    ├── 📂 src/
    │   ├── 📂 pages/
    │   │   ├── HomePage.jsx        # Landing page
    │   │   └── RepoPage.jsx        # Detail view
    │   ├── 📂 components/
    │   │   ├── Navbar.jsx
    │   │   ├── RepoCard.jsx
    │   │   ├── RepoSubmitForm.jsx
    │   │   ├── PowerScoreBar.jsx
    │   │   ├── CommentBox.jsx      # Input component
    │   │   └── CommentList.jsx     # Display component
    │   ├── 📂 context/
    │   │   └── ThemeContext.jsx
    │   ├── 📂 services/
    │   │   └── api.js              # Axios instance
    │   ├── App.jsx
    │   └── main.jsx
    ├── vite.config.js
    ├── tailwind.config.js
    ├── package.json
    └── .env
```

---

## 🔌 API Reference

### Repository Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/repo` | Submit a GitHub URL for analysis |
| `GET` | `/api/repos` | List all repos with optional filters |
| `GET` | `/api/repo/:id` | Get detailed repo information |
| `DELETE` | `/api/repo/:id` | Remove a repository |

**Query Parameters:**
- `?search=keyword` - Search by name or description
- `?category=DevOps` - Filter by category
- `?sort=power_score` - Sort results

### Comment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/repo/:id/comment` | Add comment or reply |
| `GET` | `/api/repo/:id/comments` | Get threaded comments |
| `PUT` | `/api/comment/:id/like` | Like a comment |
| `DELETE` | `/api/comment/:id` | Delete comment |

**Query Parameters:**
- `?sort=newest` or `?sort=liked` - Sort comments

---

## ⚡ Power Score Algorithm

The Power Score is a composite metric (0-100) designed to identify quality repositories:

$$\text{Score} = \left(\text{Stars} \times 0.40\right) + \left(\text{Forks} \times 0.20\right) + \left(\text{Contributors} \times 0.15\right)$$
$$+ \left(\text{Activity} \times 0.10\right) + \left(\text{README Quality} \times 0.10\right) + \left(\text{Beginner Friendly} \times 0.05\right)$$

All components are **log-normalized** to prevent dominance by single metrics.

**Score Ranges:**
- `80-100` → ⭐ Excellent (Advanced)
- `50-79` → ⭐ Good (Intermediate)
- `0-49` → ⭐ Learning (Beginner)

---

## 🧰 Tech Stack

### Frontend
```
React 19.2 + Vite 8.0
Tailwind CSS 3.4 + PostCSS
React Router v7 + React Hot Toast
Framer Motion + Three.js + Vanta
```

### Backend
```
Node.js 18+ + Express 4.19
Supabase (PostgreSQL) + JWT
Axios + GitHub REST API
```

### DevOps
```
Docker + Docker Compose
GitHub Actions (CI/CD)
GitHub Pages (static hosting)
```

| Category | Technology |
|----------|-----------|
| **Frontend** | React + Vite + Tailwind CSS |
| **Backend** | Node.js + Express |
| **Database** | Supabase (PostgreSQL) |
| **HTTP Client** | Axios |
| **Markup** | React-Markdown + remark-gfm |
| **Routing** | React Router v6 |
| **Notifications** | React-hot-toast |
| **Animations** | Framer Motion |
| **3D Graphics** | Three.js + Vanta |

---

## 🔐 Security & Compliance

✅ **No GitHub Token Required** - Uses public GitHub REST API  
✅ **Rate Limit:** 60 requests/hour per IP  
✅ **Open Source** - MIT License  
✅ **Privacy Focused** - No data collection or tracking  

---

## 🐳 Docker Deployment

Build and run with Docker:

```bash
# Build images
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

Access:
- Frontend: `http://localhost`
- Backend: `http://localhost:5000`

---

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow ESLint rules: `npm run lint`
- Test locally before pushing
- Keep commits atomic and descriptive
- Update README for new features

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [GitHub REST API](https://docs.github.com/en/rest)
- [Supabase](https://supabase.com) for excellent PostgreSQL hosting
- [React](https://react.dev) and [Vite](https://vitejs.dev) communities

---

<div align="center">

**Made with ❤️ for learners and developers**

[↑ Back to top](#-repoacademy)

</div>
