import React from 'react';
import './App.css';
import {TasksPropsType, Todolist} from './Todolist';

function App() {

    let tasks1: Array<TasksPropsType> = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]
    let tasks2: Array<TasksPropsType> = [
        {id: 1, title: 'Reno', isDone: true},
        {id: 2, title: 'One', isDone: true},
        {id: 3, title: 'Key', isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasks1}/>
            <Todolist title='Films' tasks={tasks2}/>

        </div>
    );
}

export default App;
