import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
};
export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
    const [itemTitle, setItemTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addItemHandler = () => {
        if(itemTitle.trim() !== '') {
            addItem(itemTitle.trim());
            setItemTitle('');
        } else {
            setError('Title is required');
        }
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value);
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if(e.key === 'Enter') {
            addItemHandler();
        }
    }

    return (
        <div>
            <Input
                className={error ? 'error' : ''}
                value={itemTitle}
                onChange={changeTaskTitleHandler}
                onKeyUp={onKeyUpHandler}/>
            <Button title="+" onClick={addItemHandler}/>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};