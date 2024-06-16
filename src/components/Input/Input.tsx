import {ChangeEvent, KeyboardEvent} from "react";

type InputPropsType = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void
};

export const Input = ({value, onChange, onKeyUp}: InputPropsType) => {

    return (
        <input type="text" value={value} onChange={onChange} onKeyUp={onKeyUp}/>
    );
};