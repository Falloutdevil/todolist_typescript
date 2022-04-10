import React from 'react';
import {FilterValuesType} from './App';

type TodolistPropsType = {
    title: string
    tasks: TasksPropsType[]
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist: React.FC<TodolistPropsType> = ({title, tasks, removeTask, changeFilter}) => {
    return (
        <div><h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map((t) => {
                        return <li><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {removeTask(t.id)}}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={() => {changeFilter('all')}}>All</button>
                <button onClick={() => {changeFilter('active')}}>Active</button>
                <button onClick={() => {changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}