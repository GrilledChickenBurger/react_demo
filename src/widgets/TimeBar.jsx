import { useState, useRef, useEffect } from 'react';
import TimeSlider from "@arcgis/core/widgets/TimeSlider";
import TimeInterval from "@arcgis/core/TimeInterval";
import styles from './TimeBar.module.css';

export default function TimeBar(props) {
    const { handleTimeChange } = props;
    const timebarRef = useRef(null);

    useEffect(() => {
        console.log("TimeBar mounted");

        // 打印 timebarRef.current 来确认它在初始化时是否有效
        console.log('timebarRef.current:', timebarRef.current);

        // 例如如果 ref 不存在，可以延迟一段时间再执行
        const timer = setTimeout(() => {
            if (timebarRef.current) {
                const inittimebar = new TimeSlider({
                    container: timebarRef.current,
                    mode: "instant",
                    layout: "wide",
                    fullTimeExtent: {
                        start: new Date("2000-01-01"),
                        end: new Date("2025-01-01")
                    },
                    timeExtent: {
                        start: new Date("2000-01-01"),
                        end: new Date("2000-01-01")
                    },
                    stops: {
                        interval: new TimeInterval({
                            value: 1,
                            unit: "years"
                        }),
                    },
                });
                // 在这里可以用一个状态保存 timebar，如果需要的话
            }
        }, 0); // 直接在下一次事件循环中执行

        return () => {
            clearTimeout(timer); // 清除定时器
        };
    }, []);

    return (
        <div className={styles.timeBarContainer}>
            <div className={styles.timeBar} ref={timebarRef} onChange={handleTimeChange}></div>
        </div>
    );
}
