import React, {FC} from 'react';
import cls from './loader.module.css'
const Loader: FC = () => {
    return (
        <div className={cls.container}>
            <div className={cls.heading}>Waiting for your opponent</div>
            <div className={cls.loader}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader
