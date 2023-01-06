import styled from "@emotion/styled";
import React from "react";
import { LanguageCode } from "../../../core/components/LanguageProvider";
import { dictionary } from "../../dict";

export const AboutMe = (props: { lang: LanguageCode }) => {
    return <Description>
        {dictionary(props.lang).aboutMe.description}
        <Languages>
            <li>{dictionary(props.lang).aboutMe.lang.en} - <b>B2</b></li>
            <li>{dictionary(props.lang).aboutMe.lang.ru} - <b>{dictionary(props.lang).aboutMe.lang.ruLevel}</b></li>
        </Languages>
  </Description>
}

const Languages = styled.ul`
    margin-bottom: 0;
`;

const Description = styled.p`
    margin: 0;
`;