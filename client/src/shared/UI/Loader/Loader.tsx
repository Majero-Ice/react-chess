import {FC} from 'react';
import styles from './loader.module.scss'


export const Loader:FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>Waiting for your opponent</div>
            <div className={styles.loader}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};