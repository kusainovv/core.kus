import styled from "@emotion/styled";
import React, { ReactNode, useState } from "react";
import { ThemeMode } from "./ThemeProvider";

const AccordionItem = styled.div<{ theme: ThemeMode }>`
  background-color: ${ props => props.theme === 'dark' ? '#404040' : 'whitesmoke' };
`;

const AccordionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid black;
  cursor: pointer;
`;

const AccordionContent = styled.div`
  padding: 20px;
  border-bottom: 1px solid black;
`;

const AccordionTitleText = styled.p`
  margin: 0;
`;

interface AccordionProps {
  children: ReactNode, 
  title: string, 
  theme: ThemeMode
}

/**
 * @title the title of accordion
 */
export const Accordion : React.FC<AccordionProps> = ({children, title, theme}) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <AccordionItem theme={theme}>
        <AccordionTitle onClick={() => setIsActive(!isActive)}>
          <AccordionTitleText>{title}</AccordionTitleText>
          {isActive ? '-' : '+'}
        </AccordionTitle>
        { isActive ? <AccordionContent>{children}</AccordionContent> : null }
      </AccordionItem>
    );
}