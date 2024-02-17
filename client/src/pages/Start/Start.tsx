import { GameModes } from '../../widgets';
import styles from './start.module.scss'


export const Start = () => {

    return (
        <div className={styles.start}>
            <div className={styles.container}>
                <h1 className={styles.heading}>React Online Chess</h1>
                <GameModes/>
            </div>
        </div>
    );
};