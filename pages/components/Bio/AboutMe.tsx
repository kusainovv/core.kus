import styled from "@emotion/styled";
import React from "react";

export const AboutMe = () => {
    return <Description>
        Front-end developer with a desire to improve, receive new tasks, learn new technologies, apply new approaches and become a developer with experience. 
        My goal as Fronte-end developer is to apply my technical skills, utilize my knowledge, get knowledge from other developers and just do my work by 100%. 
        I strive to bring success to the company, learn and educate others, develop IT solutions and solve problems!

        <Languages>
            <li>English - <b>B2</b></li>
            <li>Russian - <b>Native</b></li>
        </Languages>
  </Description>
}

const Languages = styled.ul`
    margin-bottom: 0;
`;

const Description = styled.p`
    margin: 0;
`;