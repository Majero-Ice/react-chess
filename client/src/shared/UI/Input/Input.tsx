import { ChangeEvent, FC } from 'react';
import styles from './input.module.scss'


interface InputProps{
    value:string
    name?:string
    changeHandler:(e:ChangeEvent<HTMLInputElement>) => void
}

export const Input:FC<InputProps> = ({value,changeHandler,name}) => {

    return (
        <>
            <input type="text" className={styles.input} value={value} name={name} onChange={changeHandler}/>
        </>
    );
};