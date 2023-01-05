import styled from "@emotion/styled";
import React from "react";
import { LanguageCode } from "../../core/components/LanguageProvider";

const Lang = styled.p<{ isActive: boolean }>`
    margin: 0 10px;
    cursor: pointer;

    color: ${ props => props.isActive ? 'palevioletred' : 'inherit' };

    transition: 0.4s;
    &:hover {
       text-decoration: underline;
    }
`;

export const Languages = () => {
    return <></>
}

interface LanguageProps {
    langCode: LanguageCode,
    currentLang: LanguageCode,
    onChooseHandler: (x: LanguageCode) => void
}

const Language = ({ langCode, onChooseHandler, currentLang }: LanguageProps) => {
    return <Lang onClick={() => { onChooseHandler(langCode) }} isActive={currentLang === langCode}>
        {langCode}
    </Lang>
}

const Russian = (props: { onChooseHandler: (x: LanguageCode) => void, currentLang: LanguageCode }) => <Language langCode="en" onChooseHandler={props.onChooseHandler} currentLang={props.currentLang} />
const English = (props: { onChooseHandler: (x: LanguageCode) => void, currentLang: LanguageCode }) => <Language langCode="ru" onChooseHandler={props.onChooseHandler} currentLang={props.currentLang} />

Languages.Russian = Russian;
Languages.English = English;