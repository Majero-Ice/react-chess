import React, {Dispatch, FC, SetStateAction} from 'react';

import cls from './modal.module.css'
import Button from "../Button/Button";
import {useParams} from "react-router-dom";

interface ModalProps {
    modal:boolean
    title:string
    closeHandler?:() =>void
    children?:React.ReactNode
    closeButton?:boolean
}


const Modal:FC<ModalProps> = ({closeHandler,title,children,closeButton = true}) => {
    return (
        <div className={cls.backdrop}>
            <div className={cls.modal} onClick={(e) => e.stopPropagation()}>
                <div className={cls.header}>{title}</div>
                <div className={cls.content}>{children}</div>

                {closeButton && closeHandler
                    ?<div className={cls.footer}>
                        <Button click={() => closeHandler()}>Enter</Button>
                    </div>
                    :''
                }

            </div>
        </div>
    );
};

export default Modal;