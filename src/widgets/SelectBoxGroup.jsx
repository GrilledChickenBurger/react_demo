import propType from 'prop-types';

import styles from './SelectBoxGroup.module.css';

const testinfo = [{
    title: "group1",
    items: [{ value: "1.1", label: "item1.1" },
    { value: "1.2", label: "item1.2" },
    { value: "1.3", label: "item1.3" },]
},
{ value: "2", label: "item2" },
{ value: "3", label: "item3" },
{
    title: "group4",
    items: [{ value: "4.1", label: "item4.1" },]
}
]

export default function SelectBoxGroup(props) {
    const optionitems = props.list;

    // 递归函数，用于生成下拉框选项
    const renderOptions = (items) => {
        return items.map((item, index) => {
            if (item.title) {
                let isligit = /^\d/.test(item.title);
                return (
                    <optgroup label={item.title} key={index}
                        style={!isligit ? { backgroundColor: '#ccc' } : { backgroundColor: '#f2f2f2' }}
                    >
                        {renderOptions(item.items)}
                    </optgroup>
                );
            }
            return (
                <option className={styles.selectBoxLabel} style={{ backgroundColor: 'white' }}
                    key={item.value} value={item.value}
                >
                    {item.label}
                </option>
            );
        });
    };

    return (
        <select id="options" className={styles.selectBox}
            onChange={props.handleSelectChange}>
            <option value="" aria-disabled="true" style={{ display: 'none', textAlign: 'center' }}>-- 请选择一个选项 --</option>
            {renderOptions(optionitems)}
        </select>
    );
}

SelectBoxGroup.propTypes = {
    list: propType.arrayOf(propType.oneOfType([
        propType.shape({
            value: propType.string,
            label: propType.string
        }),
        propType.shape({
            title: propType.string,
            items: propType.arrayOf(propType.shape({
                value: propType.string,
                label: propType.string
            }))
        }),
    ]),),
    handleSelectChange: propType.func,
}

SelectBoxGroup.defaultProps = {
    list: [{
        value: 'value',
        label: 'Option',
    },],
    handleSelectChange: () => {
        console.log('SelectBox: handleSelectChange not defined');
    }
}

