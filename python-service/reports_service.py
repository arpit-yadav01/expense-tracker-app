# python-service/reports_service.py
import sqlite3
import pandas as pd
from datetime import datetime
from pathlib import Path
import json

DB_PATH = Path(__file__).parent / "reports.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS monthly_reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        month TEXT NOT NULL,
        total_spent REAL,
        top_category TEXT,
        overbudget_categories TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    conn.commit()
    conn.close()

def _find_date_series(df):
    # Try common date keys first
    for key in ["date", "createdAt", "timestamp", "transactionDate", "created_at"]:
        if key in df.columns:
            return pd.to_datetime(df[key], errors="coerce")
    # fallback: try to parse any object column that looks like dates
    for c in df.columns:
        if df[c].dtype == object:
            series = pd.to_datetime(df[c], errors="coerce")
            if series.notna().any():
                return series
    # nothing parseable
    return pd.Series([pd.NaT] * len(df))

def save_monthly_report(user_id, expenses, month=None, budgets=None):
    """
    Save monthly summary for given user_id and expenses list.
      - user_id: str
      - expenses: list of dicts (each should have amount and category; date optional)
      - month: "YYYY-MM" (optional, default current month)
      - budgets: dict {category: limit} optional
    Returns: inserted row id
    """
    if not expenses:
        raise ValueError("No expenses provided")

    # Build DataFrame
    df = pd.DataFrame(expenses)
    if df.empty:
        raise ValueError("Expenses list produced empty DataFrame")

    # ensure amount exists and numeric
    if "amount" not in df.columns:
        df["amount"] = 0
    df["amount"] = pd.to_numeric(df["amount"], errors="coerce").fillna(0.0)

    # parse dates
    df["__date"] = _find_date_series(df)

    # choose month filter
    if month:
        # expect "YYYY-MM"
        target = month
    else:
        target = datetime.now().strftime("%Y-%m")

    # If no parseable dates, consider all rows (we still want a report)
    if df["__date"].isna().all():
        df_filtered = df.copy()
    else:
        df_filtered = df[df["__date"].dt.strftime("%Y-%m") == target].copy()

    total_spent = float(df_filtered["amount"].sum())
    top_category = None
    if "category" in df_filtered.columns and not df_filtered.empty:
        grouped = df_filtered.groupby("category")["amount"].sum()
        if not grouped.empty:
            top_category = grouped.idxmax()

    overbudget = []
    if budgets and isinstance(budgets, dict):
        for cat, limit in budgets.items():
            spent = float(df_filtered.loc[df_filtered.get("category")==cat, "amount"].sum()) if "category" in df_filtered.columns else 0.0
            if spent > limit:
                overbudget.append(cat)

    # Save into SQLite
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO monthly_reports (user_id, month, total_spent, top_category, overbudget_categories)
        VALUES (?, ?, ?, ?, ?)
    """, (user_id, target, total_spent, top_category, json.dumps(overbudget)))
    conn.commit()
    rowid = cur.lastrowid
    conn.close()
    return rowid

def get_last_n_months(user_id, n=3):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        SELECT id, user_id, month, total_spent, top_category, overbudget_categories, created_at
        FROM monthly_reports
        WHERE user_id = ?
        ORDER BY month DESC
        LIMIT ?
    """, (user_id, n))
    rows = cur.fetchall()
    cols = [d[0] for d in cur.description]
    conn.close()

    results = []
    for row in rows:
        rec = dict(zip(cols, row))
        # parse JSON field
        try:
            rec["overbudget_categories"] = json.loads(rec["overbudget_categories"]) if rec["overbudget_categories"] else []
        except:
            rec["overbudget_categories"] = []
        results.append(rec)
    return results

# init DB when module loads
init_db()
def delete_all_reports():
    """Utility to clear all reports (for testing)."""
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("DELETE FROM monthly_reports")
    conn.commit()
    conn.close()