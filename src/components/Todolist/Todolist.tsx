import {FilterValueType, TaskType} from "../../App";
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";
import {ChangeEvent, KeyboardEvent, useState} from "react";

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

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const changeFilterHandler = (filter: FilterValueType) => {
        changeFilter(todolistID, filter);
    }

    const addTaskHandler = () => {
        if(taskTitle.trim() !== '') {
            addTask(todolistID, taskTitle.trim());
            setTaskTitle('');
        } else {
            setError('Title is required');
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if(e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistID)
    }

    return (
        <div>
            <div className="todolist-title-container">
                <h3>{title}</h3>
                <Button title="X" onClick={removeTodolistHandler}/>
            </div>
            <div>
                <Input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={onKeyUpHandler}/>
                <Button title="+" onClick={addTaskHandler}/>
                {error && <p className="error-message">{error}</p>}
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