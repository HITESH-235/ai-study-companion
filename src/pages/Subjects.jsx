// SUBJECTS LOGIC: Manage subject creations, display, and its list

// imports and setup
import { useContext, useState, useEffect } from "react";
import { StudyContext } from "../context/StudyContext";
import Layout from "../components/Layout";

export default function Subjects() {
    const { subjects, setSubjects } = useContext(StudyContext); // context data (global level)
    

    // Subjects creation hooks
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#3498db");


    // add new subject
    const addSubject = () => {
        if (!name) return;

        const newSubject = {
            name,
            description,
            color,
        };

        setSubjects([...subjects, newSubject]);

        setName(""); // reset inputs
        setDescription("");
    };


    // delete by index
    const deleteSubject = (index) => {
        const updated = subjects.filter((_, i) => i !==index);
        setSubjects(updated); // new list only has elements with unmatched index
    };


    return (
        <Layout>
            <h1>Subjects</h1>

        {/* Subject creation form */}
            <div className="card">

            {/* enter subject name */}
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Subject name"
                />

            {/* enter subject description */}
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
 
            {/* choose color of this subject for display */}
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />

                <button onClick={addSubject}>Add</button>
            </div>


        {/* subject list display */}
            <ul style={{ listStyle: "none", padding: 0, marginTop: "15px" }}>
            {subjects.map((sub, idx) => (
                <li key={idx} className="list-item">

            {/* subject info */}
                <div>
                    <strong style={{ color: sub.color }}>{sub.name}</strong>
                    <p style={{ fontSize: "12px" }}>{sub.description}</p>
                </div>

                <button onClick={() => deleteSubject(idx)}>Delete</button>
                </li>
            ))}
            </ul>
        </Layout>
    );
}