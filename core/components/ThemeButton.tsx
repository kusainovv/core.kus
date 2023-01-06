import styled from '@emotion/styled';
import React from 'react';
import { ThemeMode } from './ThemeProvider';

interface ThemeButtonProps {
    transition: string,
    sliderWidth: number,
    wrapperWidth: number,
    switchHandler: Function,
    theme: ThemeMode
}

export const ThemeButton = (props: ThemeButtonProps) => {
    return <Wrapper onClick={() => props.switchHandler()} wrapperWidth={props.wrapperWidth} theme={props.theme} transition={props.transition}>
        <Slider theme={props.theme} transition={props.transition} wrapperWidth={props.wrapperWidth} sliderWidth={props.sliderWidth} />
    </Wrapper>
}


const Wrapper = styled.div<{ theme: ThemeMode, transition: string, wrapperWidth: number }>`
    width: ${ props => props.wrapperWidth }px;
    height: 22px;

    background-color: #363636;
    border-radius: 30px;

    cursor: pointer;
`;

const Slider = styled.button<{ theme: ThemeMode, transition: string, wrapperWidth: number, sliderWidth: number }>`
    width: ${ props => props.sliderWidth }px;
    height: 22px;
    border-radius: 100%;
    border: none;
    transform: translateX(${ props => props.theme === 'white' ? '0px' : `calc(${props.wrapperWidth - props.sliderWidth}px)` });
    background-color: white;
    transition: ${ props => props.transition };
`;
