import {FilterValueType, TaskType} from "../../App";
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    filter: FilterValueType

    removeTask: (todolistID: string, taskId: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
    changeFilter: (todolistID: string, filter: FilterValueType) => void
};

export const Todolist = ({
                             todolistID,
                             title,
                             tasks,
                             filter,
                             removeTask,
                             addTask,
                             changeTaskStatus,
                             removeTodolist,
                             changeFilter
                         }: TodolistPropsType) => {


    const changeFilterHandler = (filter: FilterValueType) => {
        changeFilter(todolistID, filter);
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
                <h3>{title}</h3>
                <Button title="X" onClick={removeTodolistHandler}/>
            </div>
            <div>
                <AddItemForm addItem={addTaskCallback}/>
            </div>
            {tasks.length === 0 ? (
                <p>There are no tasks</p>
            ) : (
                <ul>
                    {tasks.map(t => {
                        const removeTaskHandler = () => {
                            removeTask(todolistID, t.id);
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
                        }

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{t.title}</span>
                                <Button title="X" onClick={removeTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button
                    title="All"
                    className={filter === 'all' ? 'active-filter' : ''}
                    onClick={() => changeFilterHandler('all')}
                />
                <Button
                    title="Active"
                    className={filter === 'active' ? 'active-filter' : ''}
                    onClick={() => changeFilterHandler('active')}
                />
                <Button
                    title="Completed"
                    className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => changeFilterHandler('completed')}
                />
            </div>
        </div>
    );
};