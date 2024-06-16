import {ChangeEvent, KeyboardEvent} from "react";

type InputPropsType = {
    value: string
    className: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void
};

export const Input = ({value, className, onChange, onKeyUp}: InputPropsType) => {

    return (
        <input type="text" className={className} value={value} onChange={onChange} onKeyUp={onKeyUp}/>
    );
};