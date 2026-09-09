# 🔥 LifeOS – Personal Life Management & Decision Support Platform

> A comprehensive, senior-developer grade, humanized personal operating system and AI-assisted decision matrix platform built with the MERN stack (React, Tailwind CSS, Lucide Icons, Recharts, Express, Node.js).

---

## 🌟 Key Highlights & Core Features

### 1. 🔥 Decision Support Engine (Biggest USP)
- **Job Decision Comparator**: Enter salary, commute times, growth opportunities, learning curves, and expenses. LifeOS calculates an objective weighted score with percentage matches (e.g. Current Job 72% vs New Job 86%) and provides automated trade-off insights.
- **Custom Decision Matrix**: Compare choices across Career, Housing, Gadgets, and Investments with dynamic weight sliders.
- **Decision Journal & History**: Track outcomes and lessons learned from past decisions.

### 2. 🤖 AI / Smart Life Planner
- Algorithmic Focus Sequence computed via **Urgency × Importance × Deadline × Goal Impact × Available Time**.
- Generates ranked action priorities:
  1. 🔴 Office Work (High impact)
  2. 🔴 Electricity Bill (Urgent deadline)
  3. 🟠 Assignment (Due tomorrow)
  4. 🟡 Python Architecture (1 hr)
  5. 🟢 Job Preparation (30-45 min)
- **Weekly Target Time Distribution**: Balances technical learning, job prep, projects, and wellness.

### 3. 💼 Complete 360° Life Hub Modules
- **Dashboard**: Today's priorities, holistic Life Score (88%), upcoming exams, bills timeline, and instant water logger.
- **Tasks & Time**: Eisenhower 4-Quadrant Matrix, Kanban board, List view, and built-in Pomodoro Focus Timer with audio gong.
- **Career Engine**: Skills matrix with proficiency levels, job application pipeline tracker (Wishlist, Applied, Interview, Offer), and projects portfolio.
- **Finance Engine**: Multi-currency (₹ INR default, $, €), Income/Expense log, Budget progress bars, Upcoming bills alert, and Savings goals rings.
- **Learning & Exams**: Courses checklist, exam countdown timers, and syllabus trackers.
- **Health & Habits**: Daily streak heatmaps, +250ml Water counter with hydration audio drops, workout & sleep trend logs.
- **Travel & Document Vault**: Trip itineraries, packing checklists, and Document expiry countdown tags.
- **Personal CRM**: Relationships, birthday countdowns, and mentorship notes.
- **Notes & Knowledge**: Tagged markdown knowledge base and reflection journal.
- **360° Life Analytics**: Recharts multi-pillar life balance charts.

### 4. 💎 Humanized Delights & Senior Polish
- **Celebrations**: Task completion triggers a real-time celebratory confetti blast, auditory chord chimes, and instant notification alerts.
- **Command Palette (`Ctrl/Cmd + K`)**: Instant search and navigation across tasks, modules, and quick actions.
- **Quick Add (`Ctrl/Cmd + N`)**: Fast task, expense, and note creation modal.
- **Offline & Online Resilience**: Operates connected to the Express backend or in standalone browser mode with persistent storage.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
*The Express API will launch on `http://localhost:5000` with preloaded seed data for Ramya Sri.*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Open `http://localhost:3000` in your browser.*

---

## 📂 Project Structure

```
c:\Users\RAMYA SRI\Downloads\git team\
├── backend/
│   ├── src/
│   │   ├── config/ (storage.js)
│   │   ├── controllers/ (mainController.js)
│   │   ├── routes/ (apiRoutes.js)
│   │   └── seed/ (seedData.js)
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/ (Navbar, Sidebar, CommandPalette, NotificationCenter, QuickActionModal)
│   │   │   ├── dashboard/ (DashboardView)
│   │   │   ├── decisions/ (DecisionsView)
│   │   │   ├── planner/ (SmartPlannerView)
│   │   │   ├── tasks/ (TasksView)
│   │   │   ├── career/ (CareerView)
│   │   │   ├── finance/ (FinanceView)
│   │   │   ├── learning/ (LearningView)
│   │   │   ├── health/ (HealthView)
│   │   │   ├── calendar/ (CalendarView)
│   │   │   ├── travel/ (TravelView)
│   │   │   ├── documents/ (DocumentsView)
│   │   │   ├── relationships/ (RelationshipsView)
│   │   │   ├── notes/ (NotesView)
│   │   │   ├── analytics/ (AnalyticsView)
│   │   │   ├── settings/ (SettingsView)
│   │   │   └── common/ (Toast, Confetti)
│   │   ├── context/ (LifeOSContext, ThemeContext)
│   │   ├── services/ (api.js, soundService.js)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```
