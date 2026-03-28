import { useContext } from "react";
import Layout from "../components/Layout";
import { StudyContext } from "../context/StudyContext";

export default function Dashboard() {
const { tasks } = useContext(StudyContext);

const total = tasks.length;
const completed = tasks.filter(t => t.status === "completed").length;
const pending = tasks.filter(t => t.status === "pending").length;

const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

return (
  <Layout>
    <h1>Dashboard</h1>

    <div className="card">
        <p><strong>Total Tasks:</strong> {total}</p>
        <p><strong>Completed:</strong> {completed}</p>
        <p><strong>Pending:</strong> {pending}</p>
        <p><strong>Progress:</strong> {percent}%</p>

        <div className="progress-bar">
            <div
            className="progress-fill"
            style={{ width: `${percent}%` }}
            ></div>
        </div>
    </div>
  </Layout>
);
}