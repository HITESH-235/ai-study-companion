import {createContext, useState, useEffect} from "react";
export const StudyContext = createContext();

export const StudyProvider = ({children}) => {
    const [subjects, setSubjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    // loading subjects from localStorage to the state func
    useEffect(() => {
        const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
        setSubjects(storedSubjects);
    }, []);

    // saving subjects (on change with the list)
    useEffect(() => {
        localStorage.setItem("subjects", JSON.stringify(subjects));
    }, [subjects]);

    // loading tasks
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);
    }, []);

    // saving tasks
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <StudyContext.Provider value={{ subjects, setSubjects, tasks, setTasks }}>
        {children}
        </StudyContext.Provider>
    );
};