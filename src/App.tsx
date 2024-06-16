import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValueType>('all');

    const removeTask = (taskId: string) => {
        const taskCopy = [...tasks];
        setTasks(taskCopy.filter(t => t.id !== taskId));
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks([newTask, ...tasks]);
    }

    let filteredTasks = tasks;
    if(filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone);
    }
    if(filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone);
    }

    const changeTaskFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const taskCopy = tasks;
        setTasks(taskCopy.map(t => t.id === taskId ? {...t, isDone} : t));
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      filter={filter}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTaskFilter={changeTaskFilter}
            />
        </div>
    );
}

export default App;
