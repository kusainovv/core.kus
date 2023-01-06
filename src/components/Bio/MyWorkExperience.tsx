import styled from "@emotion/styled";
import React from "react";
import { LanguageCode } from "../../../core/components/LanguageProvider";
import { ThemeMode } from "../../../core/components/ThemeProvider";
import { dictionary } from "../../dict";
import { Link, List } from "./Bio.style";

interface MyWorkExperienceProps {
    theme: ThemeMode, 
    lang: LanguageCode
}

export const MyWorkExperience = (props: MyWorkExperienceProps) => {
    return <List>
        <li>
            <b>makeroi</b>
        </li>
        <li>
            <b>toolympus/dev</b>
            <WorkExperience>1.2 year</WorkExperience>
            <Link href='https://www.linkedin.com/in/ратмир-кусаинов-b67b5a257/' theme={props.theme} target={'_blank'} rel='noopener noreferrer'>
                {dictionary(props.lang).workExp.linkedIn}
            </Link>
        </li>
    </List>
}

const WorkExperience = styled.p`
    margin: 0;
    font-size: 15px;
`;