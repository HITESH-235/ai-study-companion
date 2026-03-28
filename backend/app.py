from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY: raise ValueError("GROQ_API_KEY is missing")

client = Groq(api_key=GROQ_API_KEY)

@app.route("/")
def home():
    return "API is running"

@app.route("/ai", methods=["POST"])
def generate_ai():
    data = request.json
    topic = data.get("topic")

    if not topic:
        return jsonify({"error": "No topic provided"}), 400

    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": f"Explain {topic} clearly with headings and bullet points."}
            ]
        )

        return jsonify({
            "response": completion.choices[0].message.content
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)