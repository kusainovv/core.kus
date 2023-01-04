import moment from 'moment';
import { Schedule } from './types';

const formatDate = (date: string) => moment(date).format('YYYY-M-D-H-m').split("-");

const formatEvent = (item: Schedule) =>  ({
    start: formatDate(item.start_datetime),
    end: formatDate(item.end_datetime),
    title: `${item.title} (${item.course.title})`,
});

export const downloadCalendar = (list: Schedule[]) => 
    () => {
        const ics = require('ics');
        const events = list.map(formatEvent);

        ics.createEvents(events, (_: any, value: string) => {
            let anchor = document.createElement("a");
            document.body.appendChild(anchor);

            anchor.href = 'data:text/calendar;charset=utf8,' + escape(value);
            anchor.download = 'Winter Academy Courses.ics';

            anchor.click();
            document.body.removeChild(anchor);
        });
    };
