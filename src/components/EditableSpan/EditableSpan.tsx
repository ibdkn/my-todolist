import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

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
                <TextField
                    variant={'outlined'}
                    value={title}
                    size={'small'}
                    onChange={changeTitleHandler}
                    onBlur={deactivateEditModeHandler}
                    autoFocus
                />
                ) : (
                    <span onClick={activateEditModeHandler}>{value}</span>
                )
            }
        </>
    );
};