import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {StudyProvider} from "./context/StudyContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StudyProvider>
        <App/>
    </StudyProvider>
)