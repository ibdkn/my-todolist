import React, {useState} from 'react';
import '../App.css';
import {Todolist} from "../components/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import Grid from '@mui/material/Grid';
import {AppBar, CssBaseline, IconButton, Switch, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LoginIcon from '@mui/icons-material/Login';
import {UseAppWithRedux} from "./hooks/useAppWithRedux";
import LogoutIcon from '@mui/icons-material/Logout';

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

function AppWithRedux() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

    const {todolists, tasks, removeTodolist, addTodolist, changeTodolistFilter,
        changeTodolistTitle, removeTask, addTask, changeTaskTitle, changeTaskStatus} = UseAppWithRedux();

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
                        <IconButton>
                            <LoginIcon/>
                        </IconButton>
                        {/*<IconButton>*/}
                        {/*    <LogoutIcon/>*/}
                        {/*</IconButton>*/}
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
                        return (
                            <Grid item key={tl.id}>
                                <Paper sx={{ p: '20px' }} variant="outlined" square={false}>
                                    <Todolist
                                        todolistID={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
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
