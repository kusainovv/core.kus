import moment, { MomentInput } from 'moment';

export const shortDayLabel = (day: MomentInput) => moment(day).locale('en').format('ddd');

export const formatDayInternal = (day: MomentInput) => moment(day).format("YYYY-MM-DD");
export const formatTime = (day: MomentInput) => moment(day).format("HH:mm");