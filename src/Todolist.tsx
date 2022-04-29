import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: TasksType[]
    removeTask: ( id: string, todolistId: string ) => void
    changeFilter: ( value: FilterValuesType, todolistId: string ) => void
    addTask: ( title: string, todolistId: string ) => void
    changeTaskStatus: ( taskId: string, isDone: boolean, todolistId: string ) => void
    filter: FilterValuesType
    removeTodolist: ( todolistId: string ) => void
}

export const Todolist: React.FC<PropsType> = ( {
                                                   title,
                                                   tasks,
                                                   removeTask,
                                                   changeFilter,
                                                   addTask,
                                                   changeTaskStatus,
                                                   filter,
                                                   id,
                                                   removeTodolist
                                               } ) => {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = ( e: KeyboardEvent<HTMLInputElement> ) => {
        setError(null);
        if (e.charCode === 13) {
            addTask(newTaskTitle, id);
            setNewTaskTitle('')
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addTask(newTaskTitle, id);
            setNewTaskTitle('')
        } else {
            setError('Title is required');
        }
    }

    const onAllClickHandler = () => changeFilter('all', id);
    const onActiveClickHandler = () => changeFilter('active', id);
    const onCompletedClickHandler = () => changeFilter('completed', id);
    const onRemoveTodolist = () => {
        removeTodolist(id)
    }

    return (
        <div>
            <h3>{title}
                <button onClick={onRemoveTodolist}>x</button>
            </h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    tasks.map(( t ) => {
                        const onRemoveHandler = () => {
                            removeTask(t.id, id)
                        }

                        const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
                            changeTaskStatus(t.id, e.currentTarget.checked, id)

                        }
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input
                                type="checkbox"
                                onChange={onChangeHandler}
                                checked={t.isDone}
                            />
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}