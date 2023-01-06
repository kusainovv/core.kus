import React from "react";
import { Schedule } from "./types";

import {
  AddToCalendarButton,
  Block,
  ScheduleBlock,
  ShortTitle,
  Title,
  Tutor,
} from "./AllSchedules.style";
import { formatTime } from "./dates";

interface Participant {
  lastname: string;
  firstname: string;
  title: string;
}

export const participantName = (p?: Partial<Participant> | null) => `${p?.title ? p?.title + " " : ""}${p?.firstname || ""} ${p?.lastname || ""}`;


export const ScheduleComponent = (props: {schedule: Schedule, showTime?: boolean }) => {
  const { course, tutor, start_datetime, end_datetime, title } = props.schedule;
  return (
    <ScheduleBlock>
      <Block light>
        <div>
          <Title href={course._id}>{course.title}</Title>

          <Tutor>
            {participantName(tutor)}
          </Tutor>
        </div>

        <ShortTitle>
            {props.showTime && <>
                {formatTime(start_datetime)} - {formatTime(end_datetime)}<br/>
                </>}
            {title}
        </ShortTitle>
      </Block>
      <AddToCalendarButton>
        + Add to calendar
      </AddToCalendarButton>
    </ScheduleBlock>
  );
};
