import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan( props: EditableSpanPropsType ) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');

    const activeEditMode = () => {
        setEditMode(true);
        setTitle(props.title)

    };
    const activeViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };
    const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
        setTitle(e.currentTarget.value);
    }

    return editMode
        ? <input value={title} onChange={onChangeHandler} onBlur={activeViewMode} autoFocus/>
        : <span onDoubleClick={activeEditMode}>{props.title}</span>
}