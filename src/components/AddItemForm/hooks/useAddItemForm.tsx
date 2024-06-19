import {ChangeEvent, KeyboardEvent, useState} from "react";

export const UseAddItemForm = (onItemAdded: (title: string) => void) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addItemHandler = () => {
        if (title.trim() !== '') {
            onItemAdded(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }
    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            addItemHandler();
        }
    }

    return {
        title,
        error,
        changeItemTitleHandler,
        onKeyUpHandler,
        addItemHandler
    };
};