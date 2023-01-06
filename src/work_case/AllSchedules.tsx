import moment from 'moment';
import React from 'react';
import { Schedule } from './types';
import { AllSchedulesContainer, Block } from './AllSchedules.style';
import { ScheduleRow } from './ScheduleRow';
import 'moment-timezone';
import { Timetable } from './useTimetable';

const time = (hours: number, minutes: number) =>
  moment
    .tz('Europe/Moscow')
    .set('hours', hours)
    .set('minutes', minutes)
    .local();

export const schedules = [
  [time(10, 0), time(11, 20)],
  [time(11, 20), time(11, 40)],
  [time(11, 40), time(13, 0)],
  [time(13, 0), time(13, 20)],
  [time(13, 20), time(14, 40)],
  [time(14, 40), time(16, 0)],
];

interface Props {
  list: Schedule[];
  timetable: Timetable;
}

export const AllSchedules = ({ timetable }: Props) => {
  const { getTimeTable, allDaysByTimetable } = timetable;
  return (
    <React.Fragment key = {21}>
      {allDaysByTimetable?.map((currentWeek, id: number) => {
        return (
            <AllSchedulesContainer key={id}>
              {currentWeek?.map((currentDay, indx: number) => {
                return (
                <React.Fragment key = {indx}>
                    {indx % 6 === 0 && <Block />}
                    <Block key={0}>
                      <div className='text-black'>
                        <b>{moment(currentDay).locale('en').format('MMMM')}</b>
                        <br />
                        {moment(currentDay).format('DD')}
                      </div>
                      {moment(currentDay).locale('en').format('dddd')}
                    </Block>
                </React.Fragment>
                );
              })}

              {getTimeTable(allDaysByTimetable[id]).map(
                (start, idx: number) => (
                  <React.Fragment key = {idx}>
                    <ScheduleRow key={start.toString()} num={start} idx={idx} />
                  </React.Fragment>
                )
              )}
        </AllSchedulesContainer>
        );
      })}
    </React.Fragment>
  );
};
