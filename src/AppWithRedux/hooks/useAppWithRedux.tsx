import {useAppSelector} from "../../hooks/hooks";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../../model/todolists/todolists-reducer";
import {FilterValueType} from "../../App/App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../model/tasks/tasks-reducer";

export const UseAppWithRedux = () => {
    // const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
    // const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const todolists = useAppSelector(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks);
    const dispatch = useDispatch()

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [dispatch])

    const changeTodolistFilter = useCallback((todolistID: string, filter: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistID, filter));
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title));
    }, [dispatch])

    const removeTask = useCallback((todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID));
    }, [dispatch])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title));
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistID: string, taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, title));
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone));
    }, [dispatch])

    return {
        todolists,
        tasks,
        removeTodolist,
        addTodolist,
        changeTodolistFilter,
        changeTodolistTitle,
        removeTask,
        addTask,
        changeTaskTitle,
        changeTaskStatus
    }
};