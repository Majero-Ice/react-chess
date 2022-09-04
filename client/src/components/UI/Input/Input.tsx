import React, {FC} from 'react';

import cls from './input.module.css'

interface InputProps {
    value:string
    setValue:(value:string) =>void
    placeholder?:string
}

const Input:FC<InputProps> =({value,setValue,placeholder,...props}) => {


    return (
        <input className={cls.input}  placeholder={placeholder ?? 'Player name'}
               onChange={(event) => setValue(event.target.value)}
                {...props}
        />

    );
};

export default Input;