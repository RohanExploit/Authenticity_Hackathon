# FedEx Debt Collection Platform (MVP)

## Run Backend
```bash
cd backend
npm install
node src/server.js
```

## Run Frontend
```bash
cd frontend
npm install
npm run dev
```

## URLs

- **Customers**: http://localhost:5173/customers
- **Auto Assign**: http://localhost:5173/auto-assign
- **Collector**: http://localhost:5173/collector
- **Performance**: http://localhost:5173/performance

## Flow

1. **Backend seeds customers**
2. **Manager assigns case**
3. **Collector updates status**
4. **Performance + logs updated**
5. **Reports exported**

---

## ✅ DONE

You now have:
- Real customer data
- Risk score
- Assignment
- Collector workflow
- Performance tracking
- Logs + CSV export
- Navigation + protection
- Clean run steps
