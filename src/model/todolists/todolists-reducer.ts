import {FilterValueType, TodolistType} from "../../App";
import {v1} from "uuid";

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

type ActionTodolistsType =
    | RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistFilterACType
    | ChangeTodolistTitleACType

export const todolistID1 = v1();
export const todolistID2 = v1();

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionTodolistsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const todolistID = action.payload.todolistID;

            return state.filter(tl => tl.id !== todolistID);
        }
        case 'ADD-TODOLIST': {
            const newTodolistID = action.payload.todolistID;
            const title = action.payload.title;
            const newTodolist: TodolistType = {id: newTodolistID, title, filter: 'all'}

            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolistID = action.payload.todolistID;
            const filter = action.payload.filter;

            return state.map(tl => tl.id === todolistID ? {...tl, filter} : tl)
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todolistID = action.payload.todolistID;
            const title = action.payload.title;

            return state.map(tl => tl.id === todolistID ? {...tl, title} : tl);
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistID: v1(), title
        }
    } as const
}

export const changeTodolistFilterAC = (todolistID: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistID, filter
        }
    } as const
}

export const changeTodolistTitleAC = (todolistID: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistID, title
        }
    } as const
}
