import {useContext} from 'react';
import {StudyContext} from "../context/StudyContext";
import Layout from "../components/Layout";

export default function Revision() {
    const {tasks} = useContext(StudyContext);
    const revisionTasks = tasks.filter(t => t.revisionDate); // list with items having a revision date
    // incomplete tasks have revisionDate value null

    return (
        <Layout>
        <div style={{ padding: "20px" }}>
            <h1>Revision Planner</h1>

            {revisionTasks.length === 0 ? 
            (<p>No revision scheduled</p>) : 
            <ul style={{ listStyle: "none", padding: 0 }}>
                {revisionTasks.map((task, idx) => (
                    <li
                        key={idx}
                        style={{
                                background: "linear-gradient(135deg, #1A1F2E 0%, #16213E 100%)",
                                border: "1px solid #00D4FF",
                            marginBottom: "12px",
                            padding: "16px",
                            borderRadius: "12px",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                            transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 212, 255, 0.2)";
                            e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
                            e.currentTarget.style.transform = "translateX(0)";
                        }}
                    >
                        <strong>{task.title}</strong> ({task.subject})
                        <br/>
                            <span style={{ color: "#A8D8DA", fontSize: "13px", marginTop: "8px", display: "block" }}>
                            Revision Date: {new Date(task.revisionDate).toLocaleDateString()}
                        </span>
                    </li>
                ))}
            </ul>}
        </div>
        </Layout>
    );
}