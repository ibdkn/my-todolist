// @flow
import * as React from 'react';
import {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {getListItemSx} from "../Todolist/Todolist.styles";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../../AppWithRedux/AppWithRedux";

type TaskPropsType = {
    taskID: string
    todolistID: string
    task: TaskType
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
};
export const Task = ({taskID, todolistID, task, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {
    const removeTaskHandler = () => {
        removeTask(todolistID, taskID);
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todolistID, taskID, e.currentTarget.checked);
    }

    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(todolistID, taskID, title);
    }, [todolistID, taskID, changeTaskTitle])

    return (
            <ListItem
                className={task.isDone ? 'is-done' : ''}
                sx={getListItemSx(task.isDone)}>
                <div>
                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                </div>
                <IconButton onClick={removeTaskHandler}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
    );
};