import styled from "@emotion/styled";
import React from "react";
import { LanguageCode } from "../../core/components/LanguageProvider";

const Lang = styled.p`
    margin: 0 10px;
    cursor: pointer;

    &:hover {
       text-decoration: underline;
    }
`;

export const Languages = () => {
    return <></>
}

interface LanguageProps {
    langCode: LanguageCode,
    onChooseHandler: (x: LanguageCode) => void
}

const Language = ({ langCode, onChooseHandler }: LanguageProps) => {
    return <Lang onClick={() => { onChooseHandler(langCode) }}>
        {langCode}
    </Lang>
}

const Russian = (props: { onChooseHandler: (x: LanguageCode) => void }) => <Language langCode="en" onChooseHandler={props.onChooseHandler} />
const English = (props: { onChooseHandler: (x: LanguageCode) => void }) => <Language langCode="ru" onChooseHandler={props.onChooseHandler} />

Languages.Russian = Russian;
Languages.English = English;