import styled from '@emotion/styled';
import React from 'react';
import { useThemeMode } from '../utils/useThemeMode';
import { ThemeMode } from './ThemeProvider';

const Wrapper = styled.div<{ theme: ThemeMode, transition: string, wrapperWidth: number }>`
    width: ${ props => props.wrapperWidth }px;
    height: 22px;

    background-color: ${ props => props.theme === 'white' ? 'red' : 'red'};
    border-radius: 30px;
`;

const Slider = styled.button<{ theme: ThemeMode, transition: string, wrapperWidth: number, sliderWidth: number }>`
    width: ${ props => props.sliderWidth }px;
    height: 22px;
    border-radius: 100%;
    border: none;
    transform: translateX(${ props => props.theme === 'white' ? '0%' : `calc(${props.wrapperWidth - props.sliderWidth}px)` });
    background-color: ${ props => props.theme === 'white' ? 'white' : 'black'};
    transition: ${ props => props.transition };
`;

interface ThemeButtonProps {
    transition: string,
    sliderWidth: number,
    wrapperWidth: number
}

export const ThemeButton = (props: ThemeButtonProps) => {
    const { theme, switchTheme } = useThemeMode();
    return <Wrapper onClick={() => {switchTheme()}} wrapperWidth={props.wrapperWidth} theme={theme} transition={props.transition}>
        <Slider theme={theme} transition={props.transition} wrapperWidth={props.wrapperWidth} sliderWidth={props.sliderWidth} />
    </Wrapper>
}