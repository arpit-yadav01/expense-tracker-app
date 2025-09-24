from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow frontend requests

@app.route("/suggestions", methods=["POST"])
def get_suggestions():
    data = request.get_json()
    # Accept {"expenses": [...]} or raw array
    if isinstance(data, dict) and "expenses" in data:
        expenses = data.get("expenses", [])
    elif isinstance(data, list):
        expenses = data
    else:
        expenses = []

    total = sum(e.get("amount", 0) for e in expenses)
    suggestions = []

    if total > 50000:
        suggestions.append("⚠️ Your spending is quite high this month, consider setting stricter budgets.")
    if any(e.get("category") == "Food" for e in expenses):
        suggestions.append("🍔 Food is a common expense — maybe try meal planning to reduce costs.")
    if not suggestions:
        suggestions.append("✅ Spending looks balanced. Keep tracking to spot trends.")

    return jsonify({"suggestions": suggestions})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
