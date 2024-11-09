import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

import styles from './GroupColumnChart.module.css';

export default function GroupColumnChart(props) { 
    let {
        x_data={name: 'X', data: ['x1', 'x2', 'x3']},
        y_data={name: 'Y', data: [10, 20, 30]},
        title= 'title',
        isGroup=false,
    } = props.settings;

    const series_data =
        isGroup ?
        y_data.data.map((item) => ({ type: 'bar', name: item.name, data: item.data })) :
        [{ type: 'bar', data: y_data.data }];
        

    const getOption = () => ({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
        },
        legend: {
          borderWidth: 1,
          borderColor: 'rgb(229, 231, 235)',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
        xAxis: {
            type: 'category',
            name: x_data.name,
            data: x_data.data,
        },
        yAxis: {
            type: 'value',
            name: y_data.name,
        },
        series: series_data,
    });
    return (
        <div className={styles.chartContainer}>
          <p>{title}</p>
          <ReactECharts option={getOption()} />
        </div>
      );
}