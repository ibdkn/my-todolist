import {useState} from "react";
import {v1} from "uuid";
import {todolistID1, todolistID2} from "../../utils/id-utils";
import {TasksStateType} from "../App";

export const UseTasks = () => {
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    });

    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)});
    }

    const addTask = (todolistID: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }

    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title} : t)})
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }

    const removeTasksFromTodolist = (todolistID: string) => {
        delete tasks[todolistID];
        setTasks({...tasks});
    }
    const addTasksForTodolist = (newTodolistID: string) => {
        setTasks({...tasks, [newTodolistID]: []});
    }

    return {
        tasks,
        setTasks,
        removeTask,
        addTask,
        changeTaskTitle,
        changeTaskStatus,
        removeTasksFromTodolist,
        addTasksForTodolist
    }
};