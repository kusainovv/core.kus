import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

const animate = keyframes`
    from {
        background-position: 500% 0;
    }

    to {
        background-position: 0 0;
    }
`

const IndicatorLine = styled.div`
    position: relative;
    width: 100%;
    height: 12px;
    background-color: white;

    &:before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094);
        animation: ${animate} 20s linear infinite;
        background-size: 500%;
    }

    &:after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094);
        animation: ${animate} 20s linear infinite;
        background-size: 500%;
        filter: blur(20px);
    }
`;


export const Indicator = () => {
    return <IndicatorLine />
}