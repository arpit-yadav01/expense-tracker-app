# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from suggestions import analyze_expenses
# from reports_service import save_monthly_report, get_last_n_months

# app = Flask(__name__)
# CORS(app)

# # Error handlers must be defined after app is created
# @app.errorhandler(404)
# def not_found(e):
#     return jsonify({"error": "Not found", "detail": str(e)}), 404

# @app.errorhandler(405)
# def method_not_allowed(e):
#     return jsonify({"error": "Method not allowed", "detail": str(e)}), 405

# @app.route("/", methods=["GET"])
# def index():
#     return "Python service running"

# @app.route("/suggestions", methods=["POST"])
# def get_suggestions():
#     if not request.is_json:
# @app.errorhandler(404)
# def not_found(e):
#     return jsonify({"error": "Not found", "detail": str(e)}), 404

# @app.errorhandler(405)
# def method_not_allowed(e):
#     return jsonify({"error": "Method not allowed", "detail": str(e)}), 405
# # # python-service/main.py
# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # from suggestions import analyze_expenses
# # import logging

# # app = Flask(__name__)
# # CORS(app)

# # @app.route("/", methods=["GET"])
# # def index():
# #     return "Suggestions service running"

# # @app.route("/suggestions", methods=["POST"])
# # def get_suggestions():
# #     data = request.get_json()
# #     # Accept {"expenses": [...]} or raw array
# #     if isinstance(data, dict) and "expenses" in data:
# #         expenses = data.get("expenses", [])
# #     elif isinstance(data, list):
# #         expenses = data
# #     else:
# #         expenses = []

# #     try:
# #         from suggestions import analyze_expenses
# #         result = analyze_expenses(expenses)
# #         return jsonify({"suggestions": result})
# #     except Exception as e:
# #         return jsonify({"error": "Server error", "detail": str(e), "expenses": expenses}), 500

# # if __name__ == "__main__":
# #     app.run(host="127.0.0.1", port=5001, debug=True)


# # python-service/main.py
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from suggestions import analyze_expenses
# from reports_service import save_monthly_report, get_last_n_months

# app = Flask(__name__)
# CORS(app)

# @app.route("/", methods=["GET"])
# def index():
#     return "Python service running"

# # # existing suggestions endpoint
# # @app.route("/suggestions", methods=["POST"])
# # def get_suggestions():
# #     data = request.get_json(force=True)
# #     # Accept {"expenses": [...]} or raw array
# #     if isinstance(data, dict) and "expenses" in data:
# #         expenses = data.get("expenses", [])
# #     elif isinstance(data, list):
# #         expenses = data
# #     else:
# #         expenses = []

# #     # Defensive: ensure each expense is a dict
# #     expenses = [e for e in expenses if isinstance(e, dict)]

# #     try:
# #         from suggestions import analyze_expenses
# #         result = analyze_expenses(expenses)
# #         return jsonify({"suggestions": result})
# #     except Exception as e:
# #         import traceback
# #         return jsonify({"error": "Server error", "detail": str(e), "trace": traceback.format_exc(), "expenses": expenses}), 500


# # @app.route("/suggestions", methods=["POST"])
# # def get_suggestions():
# #     data = request.get_json(force=True)
# #     # Accept {"expenses": [...]} or raw array
# #     if isinstance(data, dict) and "expenses" in data:
# #         expenses = data.get("expenses", [])
# #     elif isinstance(data, list):
# #         expenses = data
# #     else:
# #         expenses = []

# #     # Defensive: ensure each expense is a dict and has required fields
# #     valid_expenses = []
# #     for e in expenses:
# #         if isinstance(e, dict) and "amount" in e and "category" in e:
# #             valid_expenses.append(e)
# #     if not valid_expenses:
# #         return jsonify({"suggestions": ["No valid expenses found."]})

# #     try:
# #         from suggestions import analyze_expenses
# #         result = analyze_expenses(valid_expenses)
# #         return jsonify({"suggestions": result})
# #     except Exception as e:
# #         import traceback
# #         return jsonify({"error": "Server error", "detail": str(e), "trace": traceback.format_exc(), "expenses": valid_expenses}), 500
# # # NEW: generate & save monthly report (on-demand)
# # @app.route("/reports/generate", methods=["POST"])
# # def generate_report():
# #     """
# #     Accepts JSON body:
# #     {
# #       "userId": "user123",
# #       "month": "2025-09"          # optional
# #       "expenses": [ ... ],        # required (list)
# #       "budgets": { "Food": 1000 } # optional
# #     }
# #     """
# #     data = request.get_json(silent=True)
# #     if not data:
# #         return jsonify({"error": "Invalid JSON"}), 400

# #     user_id = data.get("userId") or data.get("user_id") or data.get("user")
# #     expenses = data.get("expenses")
# #     month = data.get("month")
# #     budgets = data.get("budgets")

# #     if not user_id:
# #         return jsonify({"error": "userId is required"}), 400
# #     if not expenses or not isinstance(expenses, list):
# #         return jsonify({"error": "expenses (array) is required"}), 400

# #     try:
# #         rowid = save_monthly_report(user_id, expenses, month=month, budgets=budgets)
# #         return jsonify({"ok": True, "rowId": rowid})
# #     except Exception as e:
# #         return jsonify({"error": "save failed", "detail": str(e)}), 500

# # # NEW: get last N months for a user
# # @app.route("/reports/<user_id>", methods=["GET"])
# # def get_reports(user_id):
# #     n = int(request.args.get("limit", 3))
# #     try:
# #         rows = get_last_n_months(user_id, n=n)
# #         return jsonify(rows)
# #     except Exception as e:
# #         return jsonify({"error": "fetch failed", "detail": str(e)}), 500

# # if __name__ == "__main__":
# #     app.run(host="127.0.0.1", port=5001, debug=True)

# @app.route("/suggestions", methods=["POST"])
# def get_suggestions():
#     if not request.is_json:
#         return jsonify({"error": "Request must be JSON"}), 400
#     data = request.get_json()
    
#     # Accept {"expenses": [...]} or raw array
#     if isinstance(data, dict) and "expenses" in data:
#         expenses = data.get("expenses", [])
#     elif isinstance(data, list):
#         expenses = data
#     else:
#         expenses = []

#     # Defensive: ensure each expense is a dict and has 'amount' and 'category'
#     valid_expenses = []
#     for e in expenses:
#         if not isinstance(e, dict):
#             continue
#         amount = e.get("amount", 0)
#         category = e.get("category", "Uncategorized")
#         date = e.get("date") or e.get("createdAt") or None
#         valid_expenses.append({
#             "amount": amount if isinstance(amount, (int, float)) else 0,
#             "category": str(category),
#             "date": date
#         })

#     if not valid_expenses:
#         return jsonify({"suggestions": ["No valid expenses found."]})

#     try:
#         from suggestions import analyze_expenses
#         result = analyze_expenses(valid_expenses)
#         return jsonify({"suggestions": result})
#     except Exception as e:
#         import traceback
#         # Log the traceback in server console
#         print(traceback.format_exc())
#         return jsonify({
#             "error": "Server error",
#             "detail": str(e),
#             "trace": traceback.format_exc(),
#             "expenses": valid_expenses
#         }), 200  # ⚠️ return 200 so frontend handles gracefully


# python-service/main.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from suggestions import analyze_expenses
from reports_service import save_monthly_report, get_last_n_months
import traceback

app = Flask(__name__)
CORS(app)

# ========================
# Global Error Handlers
# ========================
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found", "detail": str(e)}), 404

@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({"error": "Method not allowed", "detail": str(e)}), 405

@app.errorhandler(500)
def internal_error(e):
    return jsonify({"error": "Internal server error", "detail": str(e)}), 500

# ========================
# Health Check Endpoint
# ========================
@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": "Python service running"})

# ========================
# Suggestions Endpoint
# ========================
@app.route("/suggestions", methods=["POST"])
def get_suggestions():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    try:
        data = request.get_json()
    except Exception as e:
        return jsonify({"error": "Invalid JSON", "detail": str(e)}), 400

    # Accept {"expenses": [...]} or raw array
    if isinstance(data, dict) and "expenses" in data:
        expenses = data.get("expenses", [])
    elif isinstance(data, list):
        expenses = data
    else:
        expenses = []

    # Defensive: ensure each expense is a dict and has 'amount' and 'category'
    valid_expenses = []
    for e in expenses:
        if not isinstance(e, dict):
            continue
        amount = e.get("amount", 0)
        category = e.get("category", "Uncategorized")
        date = e.get("date") or e.get("createdAt") or None
        valid_expenses.append({
            "amount": amount if isinstance(amount, (int, float)) else 0,
            "category": str(category),
            "date": date
        })

    if not valid_expenses:
        return jsonify({"suggestions": ["No valid expenses found."]})

    try:
        result = analyze_expenses(valid_expenses)
        return jsonify({"suggestions": result})
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({
            "error": "Server error",
            "detail": str(e),
            "trace": traceback.format_exc(),
            "expenses": valid_expenses
        }), 200  # Always return JSON, never HTML

# ========================
# Generate Monthly Report
# ========================
@app.route("/reports/generate", methods=["POST"])
def generate_report():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()

    user_id = data.get("userId") or data.get("user_id") or data.get("user")
    expenses = data.get("expenses")
    month = data.get("month")
    budgets = data.get("budgets")

    if not user_id:
        return jsonify({"error": "userId is required"}), 400
    if not expenses or not isinstance(expenses, list):
        return jsonify({"error": "expenses (array) is required"}), 400

    try:
        rowid = save_monthly_report(user_id, expenses, month=month, budgets=budgets)
        return jsonify({"ok": True, "rowId": rowid})
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": "save failed", "detail": str(e)}), 500

# ========================
# Get Last N Months Reports
# ========================
@app.route("/reports/<user_id>", methods=["GET"])
def get_reports(user_id):
    try:
        n = int(request.args.get("limit", 3))
    except ValueError:
        n = 3

    try:
        rows = get_last_n_months(user_id, n=n)
        return jsonify(rows)
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": "fetch failed", "detail": str(e)}), 500

# ========================
# Run App
# ========================
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
