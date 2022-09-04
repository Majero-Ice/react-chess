import React, {FC} from 'react';
import cls from './button.module.css'

interface ButtonProps {
    click:() => void
    children?: React.ReactNode;
    classes?:string[]
}

const Button:FC<ButtonProps> = ({click,children,classes}) => {
    return (
        <button className={[cls.button,classes ? classes.join(' ') : cls.primary].join(' ')} onClick={click}>
            {children}
        </button>
    );
};

export default Button;