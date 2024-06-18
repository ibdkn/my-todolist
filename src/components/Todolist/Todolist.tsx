import {FilterValueType, TaskType} from "../../App";
import {ChangeEvent} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Box, Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import {Button} from '@mui/material'
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import Grid from "@mui/material/Grid";

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    filter: FilterValueType

    removeTask: (todolistID: string, taskId: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
    changeTodolistFilter: (todolistID: string, filter: FilterValueType) => void
};

export const Todolist = ({
                             todolistID,
                             title,
                             tasks,
                             filter,
                             removeTask,
                             addTask,
                             changeTaskTitle,
                             changeTaskStatus,
                             removeTodolist,
                             changeTodolistTitle,
                             changeTodolistFilter
                         }: TodolistPropsType) => {

    const updateTodolostTitleHandler = (title: string) => {
        changeTodolistTitle(todolistID, title);
    }

    const changeTodolistFilterHandler = (filter: FilterValueType) => {
        changeTodolistFilter(todolistID, filter);
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistID)
    }

    const addTaskCallback = (title: string) => {
        addTask(todolistID, title);
    }

    return (
        <div>
            <div className="todolist-title-container">
                <h3>
                    <EditableSpan value={title} onChange={updateTodolostTitleHandler}/>
                </h3>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <div>
                <AddItemForm addItem={addTaskCallback}/>
            </div>
            {tasks.length === 0 ? (
                <p>There are no tasks</p>
            ) : (
                <List>
                    {tasks.map(t => {
                        const removeTaskHandler = () => {
                            removeTask(todolistID, t.id);
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(todolistID, t.id, title);
                        }

                        return (
                            <ListItem
                                key={t.id}
                                className={t.isDone ? 'is-done' : ''}
                                sx={getListItemSx(t.isDone)}>
                                <div>
                                    <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={t.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <Box sx={filterButtonsContainerSx}>{/*...*/}</Box>
            <Grid container spacing={1}>
                <Grid item>
                    <Button
                        size="small"
                        variant="contained"
                        // variant={filter === 'all' ? 'contained' : 'contained'}
                        color={filter === 'all' ? 'primary' : 'inherit'}
                        onClick={() => changeTodolistFilterHandler('all')}
                    >
                        All
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        size="small"
                        variant="contained"
                        color={filter === 'active' ? 'primary' : 'inherit'}
                        onClick={() => changeTodolistFilterHandler('active')}
                    >
                        Active
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        size="small"
                        variant="contained"
                        color={filter === 'completed' ? 'primary' : 'inherit'}
                        onClick={() => changeTodolistFilterHandler('completed')}
                    >
                        Completed
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};