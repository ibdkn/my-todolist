import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox'
import {UseAddItemForm} from "./hooks/useAddItemForm";

type AddItemFormPropsType = {
    addItem: (title: string) => void
};
export const AddItemForm = React.memo(({addItem}: AddItemFormPropsType) => {
    const {
        title,
        error,
        changeItemTitleHandler,
        onKeyUpHandler,
        addItemHandler
    } = UseAddItemForm(addItem)

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
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
});