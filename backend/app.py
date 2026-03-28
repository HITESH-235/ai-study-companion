from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["https://ai-study-companion-dusky.vercel.app"])

client = None

def get_client():
    global client
    if client is None:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise RuntimeError("GROQ_API_KEY not found at runtime")
        client = Groq(api_key=api_key)
    return client


@app.route("/")
def home():
    return "API is running"


@app.route("/ai", methods=["POST"])
def generate_ai():
    data = request.get_json(silent=True)

    if not data or "topic" not in data:
        return jsonify({"error": "Invalid request"}), 400

    topic = data["topic"]

    try:
        groq_client = get_client()

        completion = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": f"Explain {topic} clearly with headings and bullet points."}
            ]
        )

        return jsonify({
            "response": completion.choices[0].message.content
        })

    except Exception:
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)