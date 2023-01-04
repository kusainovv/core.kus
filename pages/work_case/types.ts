export interface Course {
    description: string;
    _id: string;
    group_chat_id: string;
    tutor: Tutor;
    title: string;
    kind: string;
    tutor_id: string;
    shorttitle: string;
}
  
  
export interface Schedule {
    _id: string,
    end_datetime: string,
    title: string,
    course_id: string,
    start_datetime: string
}

export interface Tutor {
    _id: string;
    email: string;
    consent_share_profile: boolean;
    is_tutor: boolean; 
    lastname: string;
    consent_email_show: boolean;
    title: string;
    firstname: string;
    bio: string;
    interests: string;
    position: string;
    is_organizer: boolean;
    linkedin_url: string;
    company: string;
    consent_email_org: boolean;
}

export const filter = ["mon", "tue", "web", "thu", "fri", "sat", "all"];

export interface Schedule {
    tutor: Tutor;
    course: Course;
}

export interface ScheduleEventSynthetic {
    is_synthetic?: boolean;
    title: string;
}

export interface ScheduleEvent {
    _id: string;
    end_datetime: string;
    title: string;
    course_id: string;
    start_datetime: string;
    course: Course;
    tutor: {
        _id: string;
        consent_share_profile: boolean;
        is_tutor: boolean;
        lastname: string;
        consent_email_show: boolean;
        title: string;
        firstname: string;
        bio: string;
        interests: string;
        position: string;
        is_organizer: boolean;
        linkedin_url: string;
        company: string;
        consent_email_org: boolean;
    };
}

export type TimeTableTContent = number | string | ScheduleEvent | false;
export interface TimeTableT {
    time: string[],
    content: TimeTableTContent[]
    isAfterHours?: boolean;
}
