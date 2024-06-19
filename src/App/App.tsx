import React, {useReducer, useState} from 'react';
import '../App.css';
import {Todolist} from "../components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import Grid from '@mui/material/Grid';
import {AppBar, CssBaseline, IconButton, Switch, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import {MenuButton} from "../components/MenuButton";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {todolistsReducer} from "../model/todolists/todolists-reducer";
import {tasksReducer} from "../model/tasks/tasks-reducer";
import {UseTasks} from "./hooks/useTasks";
import {UseTodolists} from "./hooks/useTodolists";

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

function App() {
    const {
        tasks,
        removeTask,
        addTask,
        changeTaskTitle,
        changeTaskStatus,
        removeTasksFromTodolist,
        addTasksForTodolist
    } = UseTasks();

    const {
        todolists,
        changeTodolistFilter,
        removeTodolist,
        addTodolist,
        changeTodolistTitle
    } = UseTodolists(removeTasksFromTodolist, addTasksForTodolist);

    const [themeMode, setThemeMode] = useState<ThemeMode>('dark')


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
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
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
                                <Paper sx={{p: '20px'}} variant="outlined" square={false}>
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

export default App;
