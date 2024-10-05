import SelectBox from '../structures/SelectBox.jsx';

import styles from './SideSpan.module.css';


export default function SideSpan (){
    return (
        <div className={styles.sideSpanContent}>
            <h1 style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '1rem 0' }}>SideSpan</h1>
            <div className={styles.sideSpan}>Current year: {new Date().getFullYear()}</div>
            <div className={styles.sideSpan}>Current option:
                <SelectBox />
            </div>

        </div>
    );
 }