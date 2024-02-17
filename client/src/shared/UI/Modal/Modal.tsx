import React, { Dispatch, FC, PropsWithChildren, ReactNode } from 'react';
import styles from './modal.module.scss'


interface ModalProps{
    modal:boolean
    setModal?:Dispatch<React.SetStateAction<boolean>>
    children?: ReactNode
    title:string
}

export const Modal:FC<ModalProps> = ({modal,setModal,children,title}:PropsWithChildren<ModalProps>) => {

    

    return (
        <div className={modal ? styles.background : styles.invisible}>
            <div className={styles.modal}>

                <div className={styles.title}>{title}</div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    
    );
};