import styled from "@emotion/styled";
import React from "react";
import { LanguageCode } from "../../../core/components/LanguageProvider";
import { ThemeMode } from "../../../core/components/ThemeProvider";
import { dictionary } from "../../dict";
import { Link, Title } from "./Bio.style";

interface ContactWithMeProps {
  lang: LanguageCode, 
  theme: ThemeMode
}

export const ContactWithMe = (props: ContactWithMeProps) => {
    return <>
        <Title>{dictionary(props.lang).titles.contactWithMe}</Title>
        <SocialLink href='https://t.me/kekw_k' theme={props.theme}>
          <Contact>telegram (kekw_k)</Contact>
        </SocialLink>

        <SocialLink href='mailto:kusainovratmir89@gmail.com' theme={props.theme}>
          <Contact>gmail / kusainovratmir89@gmail.com</Contact>
        </SocialLink>
    </>
}


const SocialLink = styled(Link)`
  margin: 0;
  display: block;
`;
SocialLink.defaultProps={ target: '_blank', rel: 'noreferrer noopener' }

const Contact = styled.h3`
  margin: 0;
  width: fit-content;
  font-weight: 600;
`;