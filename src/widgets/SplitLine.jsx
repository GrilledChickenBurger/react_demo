import propType from 'prop-types';

import styles from './SplitLine.module.css';

export default function SplitLine(props) {
    return (
        <div className={styles.separator}>
            <span className={styles.separatorText}>{props.title}</span>
        </div>
    );
};

SplitLine.propTypes = {
    title: propType.string,
};

SplitLine.defaultProps = {
    title: 'Separator',
};