import {TasksStateType} from "../../App/App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "../todolists/todolists-reducer";
import {todolistID1, todolistID2} from "../../utils/id-utils";

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
type AddTaskACType = ReturnType<typeof addTaskAC>;
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;

type ActionTasksType =
    | RemoveTaskACType
    | AddTaskACType
    | ChangeTaskTitleACType
    | ChangeTaskStatusACType
    | RemoveTodolistACType
    | AddTodolistACType

const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTasksType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const todolistID = action.payload.todolistID;
            const stateCopy = {...state}
            delete stateCopy[todolistID];

            return {...stateCopy}
        }
        case "ADD-TODOLIST": {
            const newTodolistID = action.payload.todolistID;
            return {
                ...state,
                [newTodolistID]: []
            }
        }
        case 'REMOVE-TASK': {
            const todolistID = action.payload.todolistID;
            const taskID = action.payload.taskID;

            return {
                ...state,
                [todolistID]: state[todolistID].filter(t => t.id !== taskID)
            }
        }
        case 'ADD-TASK': {
            const todolistID = action.payload.todolistID;
            const title = action.payload.title;
            const newTask = {id: v1(), title, isDone: false};

            return {
                ...state,
                [todolistID]: [newTask, ...state[todolistID]]
            }
        }
        case "CHANGE-TASK-TITLE": {
            const todolistID = action.payload.todolistID;
            const taskID = action.payload.taskID;
            const title = action.payload.title;

            return {
                ...state,
                [todolistID]: state[todolistID].map(t => t.id === taskID ? {...t, title} : t)
            }
        }
        case "CHANGE-TASK-STATUS": {
            const todolistID = action.payload.todolistID;
            const taskID = action.payload.taskID;
            const isDone = action.payload.isDone;

            return {
                ...state,
                [todolistID]: state[todolistID].map(t => t.id === taskID ? {...t, isDone} : t)
            }
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID, taskID
        }
    } as const
}

export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID, title
        }
    } as const
}

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistID, taskID, title
        }
    } as const
}

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID, taskID, isDone
        }
    } as const
}