import React from 'react';
import { Block } from './AllSchedules.style';
import { ScheduleComponent } from './ScheduleCompontent';
import { TimetableItem } from './useTimetable';

export const ScheduleRow = ({ idx, num } : { idx: number, num: TimetableItem }) => {
    return (
        <React.Fragment key={idx}>
            <Block>
                <div className='text-light'>
                    {num.time[2] !== "..." && <>{num.time[0]} <br />-<br /> {num.time[2]}</>}
                    {num.time[2] === "..." && <><br /><br/><br /></>}
                </div>
            </Block>
        
            {num.content.map((day: any, idx: number) => {
                switch (true) {
                    case typeof day === 'number':
                        return <Block light key={idx} />;
                    case Array.isArray(day) && day.length > 0 && day[0].is_synthetic:
                        return <Block key={idx}>{day[0].title}</Block>;
                    case Array.isArray(day) && day.length > 0:
                        return <ScheduleComponent key={idx} schedule={day[0]} showTime={num.isAfterHours} />;
                    default:
                        return <Block light={!num.isAfterHours} key={idx} />;
                }
            })}
        </React.Fragment>);
    };
