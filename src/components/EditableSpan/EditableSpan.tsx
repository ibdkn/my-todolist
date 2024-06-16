import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    onChange: (title: string) => void
};
export const EditableSpan = ({value, onChange}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState(value);

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const activateEditModeHandler = () => {
        setEditMode(true);
    }
    const deactivateEditModeHandler = () => {
        onChange(title);
        setEditMode(false);
    }

    return (
        <>
            {editMode ? (
                    <input type="text"
                           value={title}
                           onBlur={deactivateEditModeHandler}
                           onChange={changeTitleHandler}
                           autoFocus/>
                ) : (
                    <span onClick={activateEditModeHandler}>{value}</span>
                )
            }
        </>
    );
};