import React from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.css'; // 引入样式模块

function Table({ 
    columns = ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5'], // 默认列标题
    data = [ {}, {} ] // 默认包含两行的空数据对象
}) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className={styles.th}>
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className={styles.tr}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} className={styles.td}>
                                {row[column] || ''} {/* 如果没有值则显示为空 */}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired, // 列标题数组
    data: PropTypes.arrayOf(PropTypes.object).isRequired,   // 数据对象数组
};

export default Table;

