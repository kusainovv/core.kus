import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { schedules } from './AllSchedules';
import { ScheduleEvent, ScheduleEventSynthetic, TimeTableT, TimeTableTContent } from './types';
import { formatDayInternal, formatTime } from './dates';

interface TimeTableConfigT {
    daysFromFirstToLast: Moment[] | [Moment[]],
    daysForTab: Moment[]
}

export interface TimetableItem {
    time: string[];
    content: (TimeTableTContent | ScheduleEvent[] | ScheduleEventSynthetic[])[];
    isAfterHours?: boolean;
}

export interface Timetable {
    allDaysByTimetable: [Moment[]];
    allDays: Moment[];
    getTimeTable: (week: moment.Moment[]) => TimetableItem[];
    eventsForDay: (day: Moment) => ScheduleEvent[];
}

const shouldKeepDay = (d: Moment) => d.weekday() !== 0;

export const useTimetable = (allEvents: ScheduleEvent[]): Timetable => {
    const [timetableConfig, setTimetableConfig] = useState<TimeTableConfigT>({
        daysFromFirstToLast: [],
        daysForTab: []
    });

    const getDatesBetweenDates = (startDate: Date, endDate: Date): false | Moment[] => {
        if (!allEvents.length) return false;
        const possibleDays: Moment[] = [];
        while (startDate <= endDate) {
            possibleDays.push(moment(startDate).locale("en"));
            startDate.setDate(startDate.getDate() + 1);
        }
        return possibleDays;
    }

    const getMinMaxDate = (flag: string, eventsToMoments = allEvents.map(
        ({ start_datetime, end_datetime }) => [start_datetime, end_datetime]).flat().map(
            (event: string) => moment(event)) as any) => {
        const eventsByDay: moment.Moment[] = eventsToMoments.map((
            { _i }: { _i: string }, key: number) => ({ key, date: moment(_i), }))
            .map(({ date }: moment.Moment) => date);
        return flag === "max" ? moment.max(...eventsByDay) : moment.min(...eventsByDay)
    }

    const minDate = getMinMaxDate("min").toDate();
    const maxDate = getMinMaxDate("max");

    useEffect(() => {
        const daysFromFirstToLast: false | Moment[] | [Moment[]] = getDatesBetweenDates(minDate, maxDate.toDate());
        if (daysFromFirstToLast !== false) {
            sortByWeek(daysFromFirstToLast);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allEvents]);

    const sortByWeek = (days: moment.Moment[]) => {
        const daysFromFirstToLast: Moment[] | [Moment[]] = [];
        const daysSource = days.filter(shouldKeepDay);
        for (let step = 0; step <= daysSource.length - 1 && daysSource.length - 1 > 0; step += 6) {
            daysFromFirstToLast.push(
                daysSource.slice(step, step + 6 >= daysSource.length ? daysSource.length : step + 6) as any
            );
        }

        setTimetableConfig((prevState) => ({
            ...prevState,
            daysFromFirstToLast,
        }));
    }

    const createTimeTable = (week: moment.Moment[]) => {
        const getTime = (element: number, currentTime: number) => formatTime(schedules[element][currentTime]);
        const fillField = (type: string | number) =>
            Array.from({ length: 6 }, (_, i) => i + 1).map(() => typeof type === "string" ? type : type += 1);
        const makeRow = (f: [number, number], t: [number, number], type: string | number) => ({
            time: [getTime(f[0], f[1]), "-", getTime(t[0], t[1])],
            content: fillField(type),
        });

        const afterConsultancyHours = (timeTable: TimeTableT[]) => {
            const lastPossibleRow = timeTable.slice(-1)[0].time;

            return {
                time: [lastPossibleRow[2], "-", "..."],
                content: fillField(6),
                isAfterHours: true,
            } as TimeTableT;
        };

        const timeTable: TimeTableT[] = [
            makeRow([0, 0], [0, 1], 6),
            makeRow([1, 0], [1, 1], "Break"),
            makeRow([2, 0], [2, 1], 6),
            makeRow([3, 0], [3, 1], "Break"),
            makeRow([4, 0], [4, 1], 6),
            // makeRow([5, 0], [5, 1], "Consultancy Hours"),
        ];

        const calculateContent = (week: moment.Moment[], row: TimeTableT): (ScheduleEvent[] | ScheduleEventSynthetic[])[] =>
            row.content.map((content: TimeTableTContent, idx: number) => {

                if (typeof content === "string") {
                    return [{ is_synthetic: true, title: content }];
                }
                const events = allEvents.filter(({ start_datetime, end_datetime }) =>
                    formatDayInternal(start_datetime) === formatDayInternal(week[idx])
                    && formatTime(start_datetime) >= row.time[0]
                    && (row.isAfterHours || formatTime(end_datetime) <= row.time[2])
                );
                return events.length ? events : [];
            });

        const timeTableExtended: TimeTableT[] = [...timeTable, afterConsultancyHours(timeTable)];
        const sortedTimeTable = timeTableExtended.filter((i: any) => i !== false);
        return sortedTimeTable.map((currentRow: TimeTableT) => ({
            ...currentRow,
            content: calculateContent(week, currentRow),
        }));
    }

    const eventsForDay = (day: Moment): ScheduleEvent[] => {
        return allEvents
            .filter(e => formatDayInternal(e.start_datetime) === formatDayInternal(day))
            .sort((a, b) => formatTime(a.start_datetime) >= formatTime(b.start_datetime) ? 1 : -1)
    }

    const allDays = timetableConfig.daysFromFirstToLast.length && Array.isArray(timetableConfig.daysFromFirstToLast[0]) ?
        (timetableConfig.daysFromFirstToLast as Moment[][]).reduce((r, x) => [...r, ...x], [])
        : timetableConfig.daysFromFirstToLast as Moment[];

    return {
        allDaysByTimetable: timetableConfig.daysFromFirstToLast as [Moment[]],
        allDays,
        getTimeTable: (week: moment.Moment[]) => createTimeTable(week),
        eventsForDay,
    }
}
