from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

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
    data = request.json
    topic = data.get("topic")

    if not topic:
        return jsonify({"error": "No topic provided"}), 400

    try:
        groq_client = get_client()

        completion = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": f"Explain {topic} clearly with headings and bullet points."
                }
            ]
        )

        return jsonify({
            "response": completion.choices[0].message.content
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/debug")
def debug():
    return {
        "GROQ_API_KEY": repr(os.getenv("GROQ_API_KEY")),
        "ALL_ENV_KEYS": list(os.environ.keys())
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)