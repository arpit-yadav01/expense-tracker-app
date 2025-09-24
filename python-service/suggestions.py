# # python-service/suggestions.py
# import pandas as pd
# from datetime import datetime, timedelta

# DATE_KEYS = ["date", "createdAt", "timestamp", "transactionDate"]

# def _extract_date_series(df):
#     for k in DATE_KEYS:
#         if k in df.columns:
#             return pd.to_datetime(df[k], errors="coerce")
#     return pd.Series(pd.NaT, index=df.index)

# def analyze_expenses(expenses):
#     """
#     expenses: list of dicts (or DataFrame)
#     returns: list of suggestion strings
#     """
#     # Basic validation
#     if not isinstance(expenses, (list, pd.DataFrame)):
#         return ["Invalid data format. Expected a list of expense objects."]
#     if len(expenses) == 0:
#         return ["No expense data available."]

#     # Build DataFrame
#     df = pd.DataFrame(expenses) if isinstance(expenses, list) else expenses.copy()

#     # Ensure amount exists
#     if "amount" not in df.columns:
#         df["amount"] = 0

#     # Parse date from multiple keys
#     df["__parsed_date"] = _extract_date_series(df)

#     # Defensive: ensure 'category' exists for groupby
#     if "category" not in df.columns:
#         df["category"] = "Uncategorized"

#     # If all dates missing -> non-date based summary
#     if df["__parsed_date"].isna().all():
#         cat_sums = df.groupby("category")["amount"].sum().to_dict()
#         suggestions = ["No valid dates found — date-based suggestions skipped."]
#         if cat_sums:
#             top = max(cat_sums.items(), key=lambda x: x[1])
#             suggestions.append(f"Top category (no dates): {top[0]} — ₹{top[1]:.2f}")
#         return suggestions

#     # Filter last 30 days
#     cutoff = datetime.now() - timedelta(days=30)
#     df_30 = df[df["__parsed_date"] >= cutoff].copy()

#     if df_30.empty:
#         return ["No expenses found in the last 30 days."]

#     # Normalize and compute
#     df_30["amount"] = pd.to_numeric(df_30["amount"], errors="coerce").fillna(0)

#     suggestions = []
#     cat_sums = df_30.groupby("category")["amount"].sum()
#     if not cat_sums.empty:
#         top_cat = cat_sums.idxmax()
#         suggestions.append(f"Most spending (last 30 days): {top_cat} — ₹{cat_sums.max():.2f}")

#     total = df_30["amount"].sum()
#     avg_daily = total / 30.0
#     suggestions.append(f"Total last 30 days: ₹{total:.2f} (~₹{avg_daily:.2f}/day)")

#     if total > 50000:
#         suggestions.append("⚠️ You spent over ₹50,000 in the last 30 days — review budgets.")

#     if "paymentMethod" in df_30.columns:
#         pm = df_30["paymentMethod"].value_counts().head(3).to_dict()
#         if pm:
#             pm_s = ", ".join([f"{k} ({v})" for k, v in pm.items()])
#             suggestions.append(f"Top payment methods: {pm_s}")

#     return suggestions

# python-service/suggestions.py
import pandas as pd
from datetime import datetime, timedelta

DATE_KEYS = ["date", "createdAt", "timestamp", "transactionDate"]

def _extract_date_series(df):
    for k in DATE_KEYS:
        if k in df.columns:
            return pd.to_datetime(df[k], errors="coerce")
    return pd.Series(pd.NaT, index=df.index)

def analyze_expenses(expenses):
    """
    expenses: list of dicts (or DataFrame)
    returns: list of suggestion strings
    """
    if not isinstance(expenses, (list, pd.DataFrame)):
        return ["Invalid data format. Expected a list of expense objects."]
    if len(expenses) == 0:
        return ["No expense data available."]

    df = pd.DataFrame(expenses) if isinstance(expenses, list) else expenses.copy()

    if "amount" not in df.columns:
        df["amount"] = 0
    if "category" not in df.columns:
        df["category"] = "Uncategorized"

    df["__parsed_date"] = _extract_date_series(df)
    if df["__parsed_date"].isna().all():
        return ["No valid dates found — unable to generate suggestions."]

    # 🗓️ Filter periods
    now = datetime.now()
    last_30_cutoff = now - timedelta(days=30)
    prev_30_cutoff = now - timedelta(days=60)

    df_last_30 = df[df["__parsed_date"] >= last_30_cutoff].copy()
    df_prev_30 = df[(df["__parsed_date"] >= prev_30_cutoff) & (df["__parsed_date"] < last_30_cutoff)].copy()

    suggestions = []

    # ✅ Basic stats
    if df_last_30.empty:
        return ["No expenses found in the last 30 days."]

    total_last_30 = df_last_30["amount"].sum()
    suggestions.append(f"💰 Total spent in the last 30 days: ₹{total_last_30:.2f}")

    # 📊 1. High Spending Categories (>30% of total)
    category_totals = df_last_30.groupby("category")["amount"].sum().sort_values(ascending=False)
    for cat, amount in category_totals.items():
        pct = (amount / total_last_30) * 100
        if pct >= 30:
            suggestions.append(
                f"⚠️ You're spending a lot on **{cat}** (₹{amount:.2f}) — {pct:.1f}% of total. "
                f"Try reducing it by ~15%."
            )

    # 📈 2. Spending Increase Alerts (vs previous 30 days)
    if not df_prev_30.empty:
        prev_totals = df_prev_30.groupby("category")["amount"].sum()
        for cat, curr_amount in category_totals.items():
            prev_amount = prev_totals.get(cat, 0)
            if prev_amount > 0:
                growth = ((curr_amount - prev_amount) / prev_amount) * 100
                if growth > 25:
                    suggestions.append(
                        f"📈 Your **{cat}** expenses increased by {growth:.1f}% compared to the previous month."
                    )

    # 💡 Final fallback tip
    if len(suggestions) == 1:
        suggestions.append("✅ Your spending is balanced across categories this month. Great job!")

    return suggestions
