// TASK LOGIC: Handles tasks added by user for a subject/topic with many other attributes


// imports and setup
import { useContext, useState } from "react";
import { StudyContext } from "../context/StudyContext";
import Layout from "../components/Layout";


export default function Tasks() {
    const { tasks, setTasks, subjects } = useContext(StudyContext); // context data (global level)

    // Task-Creation-hooks
    const [title, setTitle] = useState(""); // taskname
    const [subject, setSubject] = useState(""); // selected subject
    const [topic, setTopic] = useState(""); // selected topic of that subject
    const [priority, setPriority] = useState("Medium"); // priority: low/mid/high
    const [deadline, setDeadline] = useState(""); // deadline date
    const [searchQuery, setSearchQuery] = useState(""); // search by title + subject

    // filtering logic
    const [filterStatus, setFilterStatus] = useState("All"); // All/pending/completed/revision
    const [filterSubject, setFilterSubject] = useState("All");
    const [filterPriority, setFilterPriority] = useState("All");


    const addTask = () => {
        if (!title || !subject) return;

        const newTask = { // attributes of each task
        title,
        subject,
        topic,
        priority,
        deadline,
        status: "pending",
        revisionDate: null,
        };

        setTasks([...tasks, newTask]); // append newTask (obj) to task list

        setTitle("");
        setSubject("");
        setTopic("");
        setPriority("Medium");
        setDeadline("");
    };


    const deleteTask = (index) => {
        const updated = tasks.filter((_, i) => i !== index); // removes selected task
        setTasks(updated);
    };


    const toggleStatus = (index) => {
        const updated = tasks.map((task, i) => {
        if (i === index) {
            const isCompleting = task.status === "pending";

            return {
            ...task, // copying all other attributes of the object except status
            status: isCompleting ? "completed" : "pending",
            revisionDate: isCompleting // after completion set revision date 3 days ahead
                ? new Date(Date.now() + 3*24*60*60000) // only if task was pending and toggle button is triggered
                : null,
            };
        }
        return task; // if not toggled mapped as it is no change in attrib
        });

        setTasks(updated);
    };


    // **FILTER** Logic
    const filteredTasks = tasks.filter((task) => {

        // searchfilter:
        if (searchQuery && 
            !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !task.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !task.topic.toLowerCase().includes(searchQuery.toLowerCase())
        ) { return false; }
        
        // priority:
        if (filterPriority !== "All" && task.priority !== filterPriority) {
            return false;
        }

        // overdue:
        if (filterStatus === "overdue") {
            return (
                task.deadline && // if no deadline given, cant be overdue
                new Date(task.deadline) < new Date() &&
                task.status !== "completed" // current date is past and task is not completed
            );
        }

        // status check
        if (filterStatus !== "All" && task.status !== filterStatus) {
            return false;
        }

        // subject check
        if (filterSubject !== "All" && task.subject !== filterSubject) {
            return false;
        }

        return true;
    });



    return (
    <Layout>
        <h1>Tasks</h1>


    {/* Section for Task Creation: */}
        <div className="card">

        {/* input field for Task's Name */}
            <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
            />

        {/* Subject selection thr dropdown */}
            <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            >
            <option value="">Select subject</option>
            {subjects.map((sub, idx) => (
                <option key={idx} value={sub.name}>
                {sub.name}
                </option>
            ))}
            </select>

        {/* input field for adding Topic */}
            <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Topic {e.g. Binary Trees}"
            />

        {/* Priority setting thr dropdown */}
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            </select>

        {/* input (date) for Deadline */}
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />

            <button onClick={addTask}>Add Task</button>
        </div>


    {/* Filter + status controls */}
        <div className="tasks-toolbar">

        {/* Filter topics By Subject and Priority */}
            <div className="tasks-filter-row">
                <select
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                >
                    <option value="All">All Subjects</option>
                    {subjects.map((sub, idx) => (
                        <option key={idx} value={sub.name}>
                        {sub.name}
                        </option>
                    ))}
                </select>

                <select
                    value={filterPriority}
                    onChange={(e) => {setFilterPriority(e.target.value)}}
                >
                    <option value="All">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>    
                </select>
            </div>

        {/* Filter by choosing one of: all/pending/completed/overdue tasks */}
            <div className="tasks-status-row">
                <button
                    className={filterStatus === "All" ? "active-filter" : ""}
                    onClick={() => setFilterStatus("All")}
                >
                    All
                </button>
                <button
                    className={filterStatus === "pending" ? "active-filter" : ""}
                    onClick={() => setFilterStatus("pending")}
                >
                    Pending
                </button>
                <button
                    className={filterStatus === "completed" ? "active-filter" : ""}
                    onClick={() => setFilterStatus("completed")}
                >
                    Completed
                </button>
                <button
                    className={filterStatus === "overdue" ? "active-filter" : ""}
                    onClick={() => setFilterStatus("overdue")}
                >
                    Overdue
                </button>
            </div>

        {/* Search for a task by topic or subject name */}
            <div className="tasks-search-row">
                <input 
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange = {(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>


    {/* list of all tasks added (with complete/undo and delete buttons) */}
        <ul style={{ listStyle: "none", padding: 0, marginTop: "15px" }}>
            {filteredTasks.map((task, idx) => (
            <li key={idx} className="list-item">
                <div>
                <strong className={task.status === "completed" ? "completed" : ""}>
                    {task.title}
                </strong>

                <div style={{ fontSize: "12px" }}>
                    {task.subject} | {task.topic} | {task.priority}
                </div>

                {task.deadline && (
                    <div style={{ fontSize: "12px", color: "#888" }}>
                    Due: {task.deadline}
                    </div>
                )}
                </div>

                <div className="task-actions">
                <button
                    onClick={() => toggleStatus(idx)}
                >
                    {task.status === "pending" ? "Complete" : "Undo"}
                </button>

                <button onClick={() => deleteTask(idx)}>Delete</button>
                </div>
            </li>
            ))}
        </ul>
    </Layout>
  );
}