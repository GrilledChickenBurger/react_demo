import React, { useRef, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import styles from './YearSlider.module.css';

export default function YearSlider(props) {
    const { startYear, endYear, handleYearChange, yearNodes, slideStep } = props.settings;
    // 定义节点
    const defaultNodes = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
    const nodes = yearNodes && yearNodes.length > 0 && yearNodes[0] === startYear && yearNodes[yearNodes.length - 1] === endYear
        ? yearNodes
        : defaultNodes;

    const [currentValue, setCurrentValue] = useState(startYear); // 当前节点值
    const [currentIndex, setCurrentIndex] = useState(0); // 当前节点索引
    const [isPlaying, setIsPlaying] = useState(false); // 自动播放状态
    const [inputValue, setInputValue] = useState('');

    const [scaleMarkWidth, setScaleMarkWidth] = useState(0);
    const scaleMarkRef = useRef(null);
    let scaleMarkPercentage;

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                // setCurrentIndex(prevIndex => {
                //     if (prevIndex < nodes.length - 1) {
                //         return prevIndex + 1;
                //     } else {
                //         return 0; // 循环播放
                //     }
                // });
                // setCurrentIndex(prevIndex => (prevIndex + 1) % nodes.length); // 自动前进一步
                setCurrentValue(prevValue => {
                    if (prevValue < endYear) {
                        return prevValue + slideStep;
                    } else {
                        setIsPlaying(false); // 停止播放
                        return startYear;
                        // return endYear;
                    }
                });
                handleYearChange(currentValue);
                
            }, 1000); // 每秒更新一次
        }

        return () => {
            clearInterval(interval); // 清除定时器
        };
    }, [isPlaying]);

    useEffect(() => {
        handleYearChange(currentValue);
    }, [currentValue]);

    useEffect(() => {
        // 获取 scaleMark 的宽度并设置
        if (scaleMarkRef.current) {
            setScaleMarkWidth(scaleMarkRef.current.offsetWidth);
            const parentWidth = scaleMarkRef.current.parentElement.offsetWidth; // 获取父元素的宽度
            scaleMarkPercentage = (scaleMarkWidth / parentWidth) * 100; // 计算比例
        }
    }, [scaleMarkRef]);

    const handleSliderChange = (event) => {
        const value = Number(event.target.value);
        const index = nodes.indexOf(value);
        setCurrentIndex(index !== -1 ? index : currentIndex);
        setCurrentValue(value);
        handleYearChange(value);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleGotoNode = () => {
        const value = Number(inputValue);
        const index = nodes.indexOf(value);
        if (index !== -1) {
            setCurrentIndex(index);
        } else {
            alert('节点值无效'); // 提示无效值
        }
    };

    return (
        <div className={styles.sliderContainer}>
            <div className={styles.sliderBar}>
                <input className={styles.slider}
                    type="range"
                    min={startYear}
                    max={endYear}
                    value={currentValue}
                    step={slideStep}
                    onChange={handleSliderChange}
                />
                <div className={styles.sliderScaleContainer}>
                    {nodes.map((node, index) => {
                        const previousNode = index > 0 ? nodes[index - 1] : startYear;
                        const position = ((node - previousNode) / (endYear - startYear)) * 100; // 计算节点位置
                        const showLabel = (node === startYear || node === endYear || (node - startYear) % 5 === 0);
                        return (
                            <div key={node} className={styles.scaleMark}
                                ref={index === 0 ? scaleMarkRef : null}
                                style={{ marginLeft: `${(index === 0 ? 0 : position-20)}%` }}>
                                <div className={styles.scaleLine} />
                                {showLabel && <span style={{ fontSize: '8px' }}>{node}</span>} {/* 显示节点值 */}
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* <div className={styles.silderGoto}>
                <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="跳转到:"
                />
                <button onClick={handleGotoNode}>跳转</button>
            </div> */}
            <div>
                <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? '⏸' : '⏵'}
                </button>
            </div>
        </div>
    );
};

YearSlider.propTypes = {
    startYear: propTypes.number,
    endYear: propTypes.number,
    handleYearChange: propTypes.func,
    yearNodes: propTypes.array,
    slideStep: propTypes.number
};
YearSlider.defaultProps = {
    startYear: 1980,
    endYear: 2020,
    handleYearChange: (event) => {
        console.log("year change: " + event.target.value);
    },
    
    slideStep: 5
    
};
