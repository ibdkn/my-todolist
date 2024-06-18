import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import Grid from '@mui/material/Grid';
import {AppBar, CssBaseline, IconButton, Switch, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import {MenuButton} from "./components/MenuButton";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolists/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./model/tasks/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {useAppSelector} from "./hooks/hooks";

type ThemeMode = 'dark' | 'light'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
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

function AppWithRedux() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark')
    // const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
    // const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const todolists = useAppSelector(state => state.todolists);
    const tasks = useAppSelector(state => state.tasks);
    const dispatch = useDispatch()

    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title));
    }

    const changeTodolistFilter = (todolistID: string, filter: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistID, filter));
    }

    const changeTodolistTitle = (todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title));
    }

    const removeTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID));
    }

    const addTask = (todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title));
    }

    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, title));
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone));
    }

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#00838f',
            },
        },
    });

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static" sx={{ mb: '30px' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler} />
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{ mb: '30px' }}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map(tl => {

                        const allTodolistTasks = tasks[tl.id];
                        let filteredTasks = allTodolistTasks;
                        if (tl.filter === 'active') {
                            filteredTasks = allTodolistTasks.filter(t => !t.isDone);
                        }
                        if (tl.filter === 'completed') {
                            filteredTasks = allTodolistTasks.filter(t => t.isDone);
                        }

                        return (
                            <Grid item key={tl.id}>
                                <Paper sx={{ p: '20px' }} variant="outlined" square={false}>
                                    <Todolist
                                        todolistID={tl.id}
                                        title={tl.title}
                                        tasks={filteredTasks}
                                        filter={tl.filter}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTodolistFilter={changeTodolistFilter}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default AppWithRedux;
