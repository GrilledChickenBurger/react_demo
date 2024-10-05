import propType from 'prop-types';

import styles from './SelectBox.module.css';

export default function SelectBox(props) {

    const optionitems = props.items;

    const options = optionitems.map((item, index) => {  
        return <option className={styles.selectBoxLabel} key={index} value={item.value}>{item.label}</option>
    });

    return (
        <select id="options" className={styles.selectBox} 
            onChange={props.handleSelectChange}>
            <option value="" aria-disabled="true" style={{display: 'none', textAlign: 'center'}}>-- 请选择一个选项 --</option>
            {options}
        </select>
    );
}

SelectBox.propTypes = {
    items: propType.arrayOf(propType.shape({
        value: propType.string,
        label: propType.string
    }),),
    handleSelectChange: propType.func,
}

SelectBox.defaultProps = {
    items: [{
        value: 'value',
        label: 'Option',
    },],
    handleSelectChange: () => {
        console.log('SelectBox: handleSelectChange not defined');
    }
}

