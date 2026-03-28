// AI Tools: Handles a key term given by user to generate summary using api

import { useState } from "react";
import Layout from "../components/Layout";
import ReactMarkdown from "react-markdown";

export default function AITools() {
    const [topic, setTopic] = useState(""); // key term for summary generation
    const [response, setResponse] = useState(""); // summary given from api
    const [loading, setLoading] = useState(false); // loading line shown temporarily

    const generateAI = async () => {
        if (!topic) return;

        setLoading(true);

        try {
            const res = await fetch("http://127.0.0.1:5000/ai", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ topic }),
            });

            const data = await res.json();
            setResponse(data.response);
        } 
        catch (err) {
            console.error(err);
            setResponse("Error generating response");
        }

        setLoading(false);
    };

  return (
    <Layout>
        <h1>AI Study Assistant</h1>

        {/* input and action button */}
        <div className="card">
            <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic (e.g. Binary Trees)"
            />

            <button onClick={generateAI}>Generate</button>
        </div>

        {/* loading message */}
        {loading && <p>Generating response...</p>}

        {/* response from api */}
        {response && (
            <div className="card">
                <h3>AI Explanation</h3>
                <ReactMarkdown>{response}</ReactMarkdown>
            </div>
        )}
    </Layout>
  );
}