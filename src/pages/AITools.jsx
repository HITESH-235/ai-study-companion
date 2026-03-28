// AI Tools: Handles a key term given by user to generate summary using api

import { useState } from "react";
import Layout from "../components/Layout";
import ReactMarkdown from "react-markdown";

export default function AITools() {
    const [topic, setTopic] = useState(""); // key term for summary generation
    const [response, setResponse] = useState(""); // summary given from api
    const [loading, setLoading] = useState(false); // loading line shown temporarily
    const API_URL = "https://ai-study-companion-production-4bb7.up.railway.app"; // 

    const generateAI = async () => {
        if (!topic.trim()) return;

        setLoading(true);
        setResponse(""); // clear previous response

        try {
            const res = await fetch(`${API_URL}/ai`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic }),
            });

            if (!res.ok) {
                throw new Error("API request failed");
            }

            const data = await res.json();
            setResponse(data.response || "No response received");
        } 
        catch (err) {
            console.error(err);
            setResponse("Error generating response");
        } 
        finally {
            setLoading(false);
        }
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

                <button onClick={generateAI} disabled={loading}>
                    {loading ? "Generating..." : "Generate"}
                </button>
            </div>

            {/* loading message */}
            {loading && <p>Generating response...</p>}

            {/* response from api */}
            {response && (
                <div className="card response">
                    {/* <h3>AI Explanation</h3> */}
                    <ReactMarkdown>{response}</ReactMarkdown>
                </div>
            )}
        </Layout>
    );
}