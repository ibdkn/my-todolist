import {useState} from "react";
import {FilterValueType, TodolistType} from "../App";
import {todolistID1, todolistID2} from "../../utils/id-utils";
import {v1} from "uuid";

export const UseTodolists = (onTodolistRemoved: (todolistID: string) => void, onTodolistAdded: (newTodolistID: string) => void) => {
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    const changeTodolistFilter = (todolistID: string, filter: FilterValueType) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter} : tl));
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID));
        onTodolistRemoved(todolistID);
    }

    const addTodolist = (title: string) => {
        const newTodolistID = v1();
        const newTodolist: TodolistType = {id: newTodolistID, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists]);
        onTodolistAdded(newTodolistID);
    }

    const changeTodolistTitle = (todolistID: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title} : tl));
    }

    return {
        todolists,
        changeTodolistFilter,
        removeTodolist,
        addTodolist,
        changeTodolistTitle
    };
};