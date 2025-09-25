#for Frontend next
cd Frontend
npm install
npm run dev

# for Backend node
cd Backend
pip install -r requirements.txt
npm run dev

#for python backend python
cd python-service
python main.py

#for python backend in node , python
cd Backend
python api_flask.py


# Expense Tracker+

A full-stack web application to track daily expenses, set monthly budgets, view reports, and get smart suggestions for better spending habits.

## Live Demo

- Frontend: [https://tracker-expenses-app.netlify.app/](https://tracker-expenses-app.netlify.app/)
- Backend (Node.js API): [https://expense-tracker-app-a1z7.onrender.com/](https://expense-tracker-app-a1z7.onrender.com/)
- Python Service (Flask API): [https://expense-tracker-python-bk8c.onrender.com/](https://expense-tracker-python-bk8c.onrender.com/)

## Features

1. **User Accounts**
   - Sign up and log in using email and password.
   - Each user sees only their own data.
   - Optional admin panel to see all users’ total spending.

2. **Manage Expenses**
   - Add, edit, delete expenses with:
     - Amount, Category, Date, Payment Method, Notes (optional)
   - Filter by date, category, or payment method.
   - Search expenses.

3. **Budget & Alerts**
   - Set monthly limits per category.
   - Alerts if spending exceeds 80% or 100% of a category budget.

4. **Dashboard / Reports**
   - Total money spent this month.
   - Category with highest spending.
   - Top 3 payment methods.
   - Pie chart for category-wise spending.
   - Line graph showing spending over time.

5. **Smart Suggestions (Python)**
   - Analyzes last 30 days’ spending.
   - Provides suggestions like:
     - “You’re spending a lot on Food. Try reducing it by 15%.”
     - “Travel expenses increased this month.”
   - Suggestions returned in JSON format for frontend.

6. **Monthly SQL Reports**
   - Stores user ID, month, total spent, top category, overbudget categories.
   - Optional: View past 3 months’ reports.

## Tech Stack

| Layer       | Tools/Frameworks                          |
|------------|-------------------------------------------|
| Frontend   | Next.js, React, TailwindCSS, Chart.js     |
| Backend    | Node.js, Express.js                        |
| Database   | MongoDB (NoSQL), |
| Python API | Flask, Pandas                              |
| Deployment | Netlify (Frontend), Render (Backend), Render/Cyclic (Python) |

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/arpit-yadav01/expense-tracker-app.git
cd expense-tracker-app/Frontend
