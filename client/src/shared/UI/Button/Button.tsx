import { FC, MouseEventHandler, PropsWithChildren, ReactNode } from 'react';
import styles from './button.module.scss'


interface ButtonProps{
    buttonType:ButtonTypes
    onClick:MouseEventHandler<HTMLButtonElement>
    children?:ReactNode
}

type ButtonTypes = 'primary' | 'default'

const Button:FC<ButtonProps> = ({buttonType,onClick,children}:PropsWithChildren<ButtonProps>) => {

    return (
        <button className={`${styles.button} ${styles[buttonType]}`} onClick={(e) => {e.preventDefault(); onClick(e)}}>
          {children}
        </button>
    );
};

export default Button;