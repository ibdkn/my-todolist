import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksState = {
    [key: string]: TaskType[]
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

const todolistID1 = v1()
const todolistID2 = v1()

function App() {
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })

    const removeTask = (taskId: string) => {
        // const taskCopy = [...tasks];
        // setTasks(taskCopy.filter(t => t.id !== taskId));
    }

    const addTask = (title: string) => {
        // const newTask = {id: v1(), title, isDone: false};
        // setTasks([newTask, ...tasks]);
    }

    const changeTaskFilter = (todolistID: string, filter: FilterValueType) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter} : tl));
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        // const taskCopy = tasks;
        // setTasks(taskCopy.map(t => t.id === taskId ? {...t, isDone} : t));
    }

    return (
        <div className="App">
            {todolists.map(tl => {

                const allTodolistTasks = tasks[tl.id];

                let filteredTasks = allTodolistTasks;

                if(tl.filter === 'active') {
                    filteredTasks = allTodolistTasks.filter(t => !t.isDone);
                }
                if(tl.filter === 'completed') {
                    filteredTasks = allTodolistTasks.filter(t => t.isDone);
                }

                return (
                    <Todolist key={tl.id}
                              todolistID={tl.id}
                              title={tl.title}
                              tasks={filteredTasks}
                              filter={tl.filter}
                              removeTask={removeTask}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskFilter={changeTaskFilter}
                    />
                )
            })}
        </div>
    );
}

export default App;
