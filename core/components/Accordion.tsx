import styled from "@emotion/styled";
import React, { ReactNode, useState } from "react";

const AccordionItem = styled.div`
  background-color: #e3e3e3;
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

export const Accordion : React.FC<{ children: ReactNode, title: string }> = ({children, title}) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <AccordionItem>
        <AccordionTitle className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div>{title}</div>
          <div>{isActive ? '-' : '+'}</div>
        </AccordionTitle>
        { isActive ? <AccordionContent>{children}</AccordionContent> : null }
      </AccordionItem>
    );
}