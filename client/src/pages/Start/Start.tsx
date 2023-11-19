import styles from './start.module.scss'
import GameModes from '../../widgets/GameModes/GameModes';


const Start = () => {

    return (
        <div className={styles.start}>
            <div className={styles.container}>
                <h1 className={styles.heading}>React Online Chess</h1>
                <GameModes/>
            </div>
        </div>
    );
};

export default Start;