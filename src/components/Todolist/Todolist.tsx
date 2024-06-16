import {FilterValueType, TaskType} from "../../App";
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]

    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskFilter: (filter: FilterValueType) => void
};
export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             addTask,
                             changeTaskStatus,
                             changeTaskFilter
                         }: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState<string>('');

    const changeTaskFilterHandler = (filter: FilterValueType) => {
        changeTaskFilter(filter);
    }

    const addTaskHandler = () => {
        addTask(taskTitle);
        setTaskTitle('');
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            addTask(taskTitle);
            setTaskTitle('');
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <Input value={taskTitle} onChange={changeTaskTitleHandler} onKeyUp={onKeyUpHandler}/>
                <Button title="+" callback={addTaskHandler}/>
            </div>
            {tasks.length === 0 ? (
                <p>There are no tasks</p>
            ) : (
                <ul>
                    {tasks.map(t => {
                        const removeTaskHandler = () => {
                            removeTask(t.id);
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked);
                        }

                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{t.title}</span>
                                <Button title="X" callback={removeTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title="All" callback={() => changeTaskFilterHandler('all')}/>
                <Button title="Active" callback={() => changeTaskFilterHandler('active')}/>
                <Button title="Completed" callback={() => changeTaskFilterHandler('completed')}/>
            </div>
        </div>
    );
};