#  FedEx Debt Collection Management Platform (MVP)

A full-stack, AI-assisted web platform to manage overdue customer accounts, automate case assignment, track collector performance, and replace manual Excel/email-based workflows.

This project demonstrates a **realistic enterprise workflow** with clean UI/UX, backend logic, and analytics integration.

---

##  Problem Statement

Managing overdue customer accounts using spreadsheets and emails leads to:
- No real-time visibility
- Delayed follow-ups
- Poor prioritization
- No performance tracking
- Weak audit trails

This platform centralizes the entire debt collection process into a **single web system** with AI-assisted decision making.

---

##  Solution Overview

The platform provides:
- Centralized customer & case management
- AI-based **Risk Scoring**
- **Auto-assignment** with manager override
- Collector dashboards for case handling
- Performance tracking with charts
- Flat-file communication logs
- Clean, professional **white UI**

---

##  User Roles

| Role | Capabilities |
|---|---|
| **Manager** | View customers, assign cases, monitor performance |
| **Collector** | View assigned cases, update status |
| **Admin (future)** | System & user management |

---

##  Key Features

### 🔹 AI Risk Score
Calculated using:
- Days past due
- Overdue amount
- Payment history

Used for prioritization and assignment decisions.

---

### 🔹 Auto Assignment (AI + Human Control)
- System suggests best collector
- Manager can edit/override
- Ensures accountability and flexibility

---

### 🔹 Case Lifecycle Management
- Assigned → Contacted → Paid / Failed
- Status updates trigger:
  - Performance updates
  - Communication logs

---

### 🔹 Collector Performance Metrics
- Total cases
- Successful recoveries
- Failed cases
- Total recovered amount
- Visualized using charts

---

### 🔹 Communication Logging
- All actions logged to flat files (`CSV`)
- Audit-friendly and exportable

---

##  UI / UX Design Principles

- **Background:** Pure white
- **Text:** Dark gray / black
- **Cards & borders:** Light gray
- **Actions:** Dark blue (buttons only)
- Clean, readable, enterprise-style UI

No dark backgrounds or night-sky blue UI.

---

##  Tech Stack

### Frontend
- React (Vite)
- Axios
- Chart.js
- Plain CSS (no heavy UI frameworks)

### Backend
- Node.js
- Express.js
- In-memory data (MVP)
- Flat-file logging

### Analytics
- Rule-based AI logic (extendable to ML)

---

##  Project Structure (High Level)

fedex-debt-collection-platform/
├── frontend/ # React UI
├── backend/ # Express APIs
├── analytics-engine # AI logic & datasets
├── logs/ # Communication logs
├── scripts/ # Automation & exports
├── docs/ # Documentation
└── README.md

---


## Application Routes

Page	URL
Customers	/customers
Auto Assignment	/auto-assign
Collector Dashboard	/collector
Performance Dashboard	/performance
Manager Dashboard	/manager

 ## End-to-End Workflow

Backend seeds customers

Manager views customers & risk scores

Manager assigns case (AI-assisted)

Collector views assigned cases

Collector updates status

## System updates:

Performance metrics

Communication logs

Manager monitors performance via charts

 Reports & Exports

Unrecovered cases exportable as CSV

Communication logs stored as flat files

Performance data visualized with charts

##  How to Run the Project

```bash
### Backend

cd backend
npm install
node src/server.js
Backend runs on:

http://localhost:5000

### Frontend

cd frontend
npm install
npm run dev

http://localhost:5173

---
