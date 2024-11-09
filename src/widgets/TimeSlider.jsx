import { Slider } from 'antd';
import React, {useEffect, useState} from 'react';

import styles from './TimeSlider.module.css';
// const yearProps = {
//   startYear: 2000,
//   endYear: 2025,
//   yearNodes: [2000, 2010, 2020, 2025],
//   slideStep: 1,
//   initYear: null,
// };

export default function TimeSlider(props) {
  const {
    startYear, endYear,
    handleYearChange=(value)=>{console.log(value)},
    yearNodes,
    slideStep = 1,
    initYear,
    yearLabels,
    option=null,
  } = props.settings;
  const [value, setValue] = useState(initYear);
  
  const defaultNodes = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  const nodes = yearNodes && yearNodes.length > 0 && yearNodes[0] === startYear && yearNodes[yearNodes.length - 1] === endYear
    ? yearNodes : defaultNodes;
  const labels = yearLabels && yearLabels.length === nodes.length
    ? yearLabels : nodes;
  
  // const marks = {
  //   0: '0°C',
  //   26: '26°C',
  //   37: '37°C',
  //   100: {
  //     style: {
  //       color: '#f50',
  //     },
  //     label: <strong>100°C</strong>,
  //   },
  // };
  const year_marks = labels.reduce((acc, label, index) => {
    acc[nodes[index]] = label;
    return acc;
  }, {});

  let valid_initYear = initYear;
  useEffect(() => {
    console.log("INSIDE YEAR SLIDER, init year change: " + initYear);
    if (initYear !== undefined && initYear != null) {
        valid_initYear = initYear < startYear ? startYear :
            initYear > endYear ? endYear : initYear;

      setValue(valid_initYear);
      handleYearChange(valid_initYear);
    }
  }, [initYear, option]);

  const handleSliderChange = (value) => {
    handleYearChange(value);
    setValue(value);
  };

  return (
    <div className={styles.timeSlider}>
      <Slider marks={year_marks} included={true} defaultValue={valid_initYear}
        step={slideStep === -1 ? null : slideStep}
        min={startYear} max={endYear} onChange={handleSliderChange} value={value}
      />

      {/* <h4>marks & step</h4>
      <Slider marks={marks} step={slideStep} defaultValue={initYear} /> */}

    </div>);
}

