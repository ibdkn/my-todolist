import {FilterValueType, TaskType} from "../../App/App";
import React, {ChangeEvent, useCallback} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Box, Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import {Button} from '@mui/material'
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import Grid from "@mui/material/Grid";
import {Task} from "../Task/Task";

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

export const Todolist = React.memo(({
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

    const updateTodolostTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(todolistID, title);
    }, [changeTodolistTitle, todolistID])

    const onAllClickHandler = useCallback(() => changeTodolistFilter(todolistID, 'all'), [changeTodolistFilter, todolistID])
    const onActiveClickHandler = useCallback(() => changeTodolistFilter(todolistID, 'active'), [changeTodolistFilter, todolistID])
    const onCompletedClickHandler = useCallback(() => changeTodolistFilter(todolistID, 'completed'), [changeTodolistFilter, todolistID])

    const removeTodolistHandler = () => {
        removeTodolist(todolistID)
    }

    const addTaskCallback = useCallback((title: string) => {
        addTask(todolistID, title);
    }, [addTask, title])

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone);
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
                    {tasksForTodolist.map(t => {
                        return (
                            <Task
                                key={t.id}
                                todolistID={todolistID}
                                taskID={t.id}
                                task={t}
                                removeTask={removeTask}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                            />
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
                        onClick={() => onAllClickHandler}
                    >
                        All
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        size="small"
                        variant="contained"
                        color={filter === 'active' ? 'primary' : 'inherit'}
                        onClick={() => onActiveClickHandler}
                    >
                        Active
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        size="small"
                        variant="contained"
                        color={filter === 'completed' ? 'primary' : 'inherit'}
                        onClick={() => onCompletedClickHandler}
                    >
                        Completed
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
});