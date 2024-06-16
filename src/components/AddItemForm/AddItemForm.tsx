import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox'

type AddItemFormPropsType = {
    addItem: (title: string) => void
};
export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addItemHandler = () => {
        if(title.trim() !== '') {
            addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }
    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if(e.key === 'Enter') {
            addItemHandler();
        }
    }

    return (
        <div>
            <TextField
                label='Enter a title'
                variant='outlined'
                className={error ? 'error' : ''}
                value={title}
                size={'small'}
                error={!!error}
                helperText={error}
                onChange={changeItemTitleHandler}
                onKeyUp={onKeyUpHandler}
            />
            <IconButton onClick={addItemHandler} color={'primary'}>
                <AddBoxIcon />
            </IconButton>
        </div>
    );
};