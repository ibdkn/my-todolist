import React, {useState} from 'react';
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
import {deepOrange, grey, lightBlue} from "@mui/material/colors";

type ThemeMode = 'dark' | 'light'

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
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark')

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, setTasks] = useState<TasksState>({
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

    const changeFilter = (todolistID: string, filter: FilterValueType) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter} : tl));
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID));
        delete tasks[todolistID];
        setTasks({...tasks});
    }

    const addTodolist = (title: string) => {
        const newTodolistID = v1();
        const newTodolist: TodolistType = {id: newTodolistID, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistID]: []});
    }

    const updateTodolistTitle = (todolistID: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title} : tl));
    }

    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId)});
    }

    const addTask = (todolistID: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }

    const updateTaskTitle = (todolistID: string, taskID: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title} : t)})
    }

    const changeTaskStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone} : t)})
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
                                        updateTaskTitle={updateTaskTitle}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        updateTodolistTitle={updateTodolistTitle}
                                        changeFilter={changeFilter}
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

export default App;
