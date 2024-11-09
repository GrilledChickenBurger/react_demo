import { TreeSelect } from 'antd';
import React, { useState } from 'react';

const treeData = [
    {
        title: 'Node1',
        value: '0-0',
        children: [
            {
                title: 'Child Node1',
                value: '0-0-1',
            },
            {
                title: 'Child Node2',
                value: '0-0-2',
            },
        ],
    },
    {
        title: 'Node2',
        value: '0-1',
    },
];
export default function SelectGroup(props) {
    const [value, setValue] = useState();
    const onChange = (newValue) => {
        console.log(newValue);
        setValue(newValue);
        handleSelectChange(newValue);
    };
    const { selectinfo = treeData,
        handleSelectChange = () => { },
        usePlaceholder = true,
        defaultValue = null
    } = props;

    return (<>
        <TreeSelect
            style={{
                width: '100%',
                marginTop: '10px',
            }}
            value={value}
            dropdownStyle={{
                maxHeight: 600,
                overflow: 'auto',
            }}
            treeData={selectinfo}
            placeholder={usePlaceholder ? "-- 请选择一个选项 --" : null}
            defaultValue={(!usePlaceholder && defaultValue) ? defaultValue : null}
            treeDefaultExpandAll
            onChange={onChange}
        />
    </>
    );
};

