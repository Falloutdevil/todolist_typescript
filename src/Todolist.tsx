import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist: React.FC<PropsType> = ({title, tasks, removeTask, changeFilter, addTask}) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    
    const addTaskHandler = () => {
        addTask(newTaskTitle);
        setNewTaskTitle('')
    }
    
    const onAllClickHandler = () =>  changeFilter('all');
    const onActiveClickHandler = () =>  changeFilter('active');
    const onCompletedClickHandler = () =>  changeFilter('completed');

    return (
        <div><h3>{title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    tasks.map((t) => {
                        const onRemoveHandler = () => {
                            removeTask(t.id)
                        }
                        
                        return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}