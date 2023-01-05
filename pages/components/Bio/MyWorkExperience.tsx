import styled from "@emotion/styled";
import React from "react";
import { LanguageCode } from "../../../core/components/LanguageProvider";
import { ThemeMode } from "../../../core/components/ThemeProvider";
import { dictionary } from "../../dict";
import { Link, List } from "./Bio.style";


export const MyWorkExperience = (props: { theme: ThemeMode, lang: LanguageCode }) => {
    return <List>
        <li>
            <b>makeroi</b>
        </li>
        <li>
            <b>toolympus/dev</b>
            <Date>1.2 year</Date>
            <Link href='https://www.linkedin.com/in/ратмир-кусаинов-b67b5a257/' theme={props.theme} target={'_blank'} rel='noopener noreferrer'>
                {dictionary(props.lang).workExp.linkedIn}
            </Link>
        </li>
    </List>
}

const Date = styled.p`
    margin: 0;
    font-size: 15px;
`;